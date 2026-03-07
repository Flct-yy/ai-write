import OpenAI from "openai";
import type { Channel, DefaultGenerics, Event, StreamChat } from "stream-chat";
import type { AIAgent } from "../types";
import { OpenAIResponseHandler } from "./OpenAIResponseHandler";

/**
 * OpenAI 智能体类
 * 负责管理 OpenAI 助手的生命周期和消息处理
 */
export class OpenAIAgent implements AIAgent {
  /** OpenAI 客户端 */
  private openai?: OpenAI;
  
  /** OpenAI 助手智能体 */
  private assistant?: OpenAI.Beta.Assistants.Assistant;
  
  /** OpenAI 线程 */
  private openAiThread?: OpenAI.Beta.Threads.Thread;
  
  /** 最后交互时间戳 */
  private lastInteractionTimestamp = Date.now();
  
  /** 回复处理程序数组 */
  private responseHandlers: OpenAIResponseHandler[] = [];

  /**
   * 构造函数
   * @param chatClient Stream Chat 客户端实例
   * @param channel Stream Chat 通道实例
   */
  constructor(
    readonly chatClient: StreamChat,
    readonly channel: Channel
  ) {}

  /**
   * 销毁智能体
   * 清理事件监听器和断开连接
   */
  dispose = async () => {
    this.chatClient.off("message.new", this.handleMessage);
    await this.chatClient.disconnectUser();

    this.responseHandlers.forEach((handler) => handler.dispose());
    this.responseHandlers = [];
  };

  /**
   * 获取用户信息
   */
  get user() {
    return this.chatClient.user;
  }

  /**
   * 获取最后交互时间戳
   * @returns 最后交互的时间戳
   */
  getLastInteraction = (): number => this.lastInteractionTimestamp;

  /**
   * 初始化智能体
   * 创建 OpenAI 客户端、助手和线程
   */
  init = async () => {
    // 初始化 OpenAI 客户端
    const apiKey = process.env.OPENAI_API_KEY as string | undefined;
    if (!apiKey) {
      throw new Error("OpenAI API key is required");
    }

    this.openai = new OpenAI({ apiKey });
    // 初始化 OpenAI 助手智能体
    this.assistant = await this.openai.beta.assistants.create({
      name: "AI Writing Assistant",
      instructions: this.getWritingAssistantPrompt(),
      model: "gpt-4o",
      tools: [
        // 代码解释工具
        { type: "code_interpreter" },
        // 网络搜索工具
        {
          type: "function",
          function: {
            name: "web_search",
            description:
              "Search the web for current information, news, facts, or research on any topic",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to find information about",
                },
              },
              required: ["query"],
            },
          },
        },
      ],
      temperature: 0.7,
    });

    // 初始化 OpenAI 线程
    this.openAiThread = await this.openai.beta.threads.create();

    // 注册消息事件处理程序
    this.chatClient.on("message.new", this.handleMessage);
  };

  /**
   * 获取写作助手提示
   * @param context 写作上下文
   * @returns 写作助手提示字符串
   */
  private getWritingAssistantPrompt = (context?: string): string => {
    // 获取当前日期
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    // 返回写助手提示
    return `You are an expert AI Writing Assistant. Your primary purpose is to be a collaborative writing partner.

**Your Core Capabilities:**
- Content Creation, Improvement, Style Adaptation, Brainstorming, and Writing Coaching.
- **Web Search**: You have the ability to search the web for up-to-date information using the 'web_search' tool.
- **Current Date**: Today's date is ${currentDate}. Please use this for any time-sensitive queries.

**Crucial Instructions:**
1.  **ALWAYS use the 'web_search' tool when the user asks for current information, news, or facts.** Your internal knowledge is outdated.
2.  When you use the 'web_search' tool, you will receive a JSON object with search results. **You MUST base your response on the information provided in that search result.** Do not rely on your pre-existing knowledge for topics that require current information.
3.  Synthesize the information from the web search to provide a comprehensive and accurate answer. Cite sources if the results include URLs.

**Response Format:**
- Be direct and production-ready.
- Use clear formatting.
- Never begin responses with phrases like "Here's the edit:", "Here are the changes:", or similar introductory statements.
- Provide responses directly and professionally without unnecessary preambles.

**Writing Context**: ${context || "General writing assistance."}

Your goal is to provide accurate, current, and helpful written content. Failure to use web search for recent topics will result in an incorrect answer.`;
  };

  /**
   * 处理消息事件
   * @param e 消息事件对象
   */
  private handleMessage = async (e: Event<DefaultGenerics>) => {
    if (!this.openai || !this.openAiThread || !this.assistant) {
      console.log("OpenAI not initialized");
      return;
    }

    if (!e.message || e.message.ai_generated) {
      return;
    }

    // 获取用户消息文本
    const message = e.message.text;
    if (!message) return;

    // 更新最后交互时间戳
    this.lastInteractionTimestamp = Date.now();

    // 获取用户自定义消息中的写作任务（如果有）
    const writingTask = (e.message.custom as { writingTask?: string })
      ?.writingTask;
    // 构建写作助手提示上下文（如果有写作任务）
    const context = writingTask ? `Writing Task: ${writingTask}` : undefined;
    const instructions = this.getWritingAssistantPrompt(context);

    // 创建用户消息到 OpenAI 线程
    await this.openai.beta.threads.messages.create(this.openAiThread.id, {
      role: "user",
      content: message,
    });

    // 创建空消息到 Channel 作为占位符
    const { message: channelMessage } = await this.channel.sendMessage({
      text: "",
      ai_generated: true,
    });

    // 发送思考状态事件
    await this.channel.sendEvent({
      type: "ai_indicator.update",
      ai_state: "AI_STATE_THINKING",
      cid: channelMessage.cid,
      message_id: channelMessage.id,
    });

    // 创建并流式处理线程运行
    const run = this.openai.beta.threads.runs.createAndStream(
      this.openAiThread.id,
      {
        assistant_id: this.assistant.id,
      }
    );

    // 创建回复处理程序
    const handler = new OpenAIResponseHandler(
      this.openai,
      this.openAiThread,
      run,
      this.chatClient,
      this.channel,
      channelMessage,
      () => this.removeHandler(handler)
    );
    this.responseHandlers.push(handler);
    void handler.run();
  };

  /**
   * 移除回复处理程序
   * @param handlerToRemove 要移除的处理程序
   */
  private removeHandler = (handlerToRemove: OpenAIResponseHandler) => {
    this.responseHandlers = this.responseHandlers.filter(
      (handler) => handler !== handlerToRemove
    );
  };
}
