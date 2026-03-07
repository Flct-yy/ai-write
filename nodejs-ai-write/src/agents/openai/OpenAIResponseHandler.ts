import OpenAI from "openai";
import type { AssistantStream } from "openai/lib/AssistantStream";
import type { Channel, Event, MessageResponse, StreamChat } from "stream-chat";

/**
 * OpenAI 响应处理类
 * 负责处理 OpenAI 流式响应，包括文本生成、工具调用和状态管理
 */
export class OpenAIResponseHandler {
  /** 回复文本缓存 */
  private messageText = "";
  
  /** 回复文本分块计数器 */
  private chunkCounter = 0;
  
  /** 线程运行 ID */
  private runId = "";
  
  /** 回复是否完成标志 */
  private isDone = false;
  
  /** 最后更新时间戳 */
  private lastUpdateTime = 0;

  /**
   * 初始化 OpenAIResponseHandler 类
   * @param openai OpenAI 客户端实例，用于调用 OpenAI API
   * @param openAiThread OpenAI 线程对象，用于管理线程状态和事件
   * @param assistantStream OpenAI 线程流对象，用于接收和处理线程事件
   * @param chatClient Stream Chat 客户端实例，用于发送事件和更新消息状态
   * @param channel Stream Chat 通道对象，用于发送事件和更新消息状态
   * @param message 原始消息对象，包含消息内容和元数据
   * @param onDispose 资源释放回调函数
   */
  constructor(
    private readonly openai: OpenAI,
    private readonly openAiThread: OpenAI.Beta.Threads.Thread,
    private readonly assistantStream: AssistantStream,
    private readonly chatClient: StreamChat,
    private readonly channel: Channel,
    private readonly message: MessageResponse,
    private readonly onDispose: () => void
  ) {
    // 初始化事件监听函数，用于处理线程流事件和停止生成事件
    this.chatClient.on("ai_indicator.stop", this.handleStopGenerating);
  }



  /**
   * 运行方法，处理 OpenAI 流式响应
   * 核心流程：
   * 1. 处理 OpenAI 流式事件
   * 2. 处理工具调用（如网络搜索）
   * 3. 提交工具输出
   * 4. 处理完成和错误事件
   */
  run = async () => {
    const { cid, id: messageId } = this.message;
    let isCompleted = false;
    // 工具输出数组，用于存储每个工具调用的输出结果
    let toolOutputs: Array<{ tool_call_id: string; output: string }> = [];
    // 当前处理的线程流事件对象
    let currentStream: AssistantStream = this.assistantStream;

    try {
      // 主循环：处理流式事件直到完成
      while (!isCompleted) {
        // 遍历处理每个流式事件
        for await (const event of currentStream) {
          // 处理通用流式事件（如文本增量、状态更新等）
          this.handleStreamEvent(event);

          // 处理工具调用请求
          if (
            event.event === "thread.run.requires_action" &&
            event.data.required_action?.type === "submit_tool_outputs"
          ) {
            // 保存当前运行 ID
            this.runId = event.data.id;
            
            // 更新 AI 状态为 "正在使用外部资源"
            await this.channel.sendEvent({
              type: "ai_indicator.update",
              ai_state: "AI_STATE_EXTERNAL_SOURCES",
              cid: cid,
              message_id: messageId,
            });
            
            // 获取需要执行的工具调用列表
            const toolCalls =
              event.data.required_action.submit_tool_outputs.tool_calls;
            toolOutputs = [];

            // 处理每个工具调用
            for (const toolCall of toolCalls) {
              // 处理网络搜索工具
              if (toolCall.function.name === "web_search") {
                try {
                  // 解析工具参数
                  const args = JSON.parse(toolCall.function.arguments);
                  // 执行网络搜索
                  const searchResult = await this.performWebSearch(args.query);
                  // 存储搜索结果
                  toolOutputs.push({
                    tool_call_id: toolCall.id,
                    output: searchResult,
                  });
                } catch (e) {
                  console.error(
                    "Error parsing tool arguments or performing web search",
                    e
                  );
                  // 处理工具调用错误
                  toolOutputs.push({
                    tool_call_id: toolCall.id,
                    output: JSON.stringify({ error: "failed to call tool" }),
                  });
                }
              }
              // 可以在这里添加其他工具的处理逻辑
            }
            
            // 跳出事件循环，准备提交工具输出
            break;
          }

          // 处理运行完成事件
          if (event.event === "thread.run.completed") {
            isCompleted = true;
            break; // 完成线程运行循环
          }

          // 处理运行失败事件
          if (event.event === "thread.run.failed") {
            isCompleted = true;
            await this.handleError(
              new Error(event.data.last_error?.message ?? "Run failed")
            );
            break; // 完成线程运行循环
          }
        }

        // 检查是否完成
        if (isCompleted) {
          break; // 线程运行完成，退出循环
        }

        // 提交工具输出并获取新的流
        if (toolOutputs.length > 0) {
          currentStream = this.openai.beta.threads.runs.submitToolOutputsStream(
            this.openAiThread.id,
            this.runId,
            { tool_outputs: toolOutputs }
          );
          toolOutputs = []; // 重置工具输出数组
        }
      }
    } catch (error) {
      // 处理运行过程中的错误
      console.error("An error occurred during the run:", error);
      await this.handleError(error as Error);
    } finally {
      // 无论成功失败，都要清理资源
      await this.dispose();
    }
  };

  /**
   * 释放资源
   * 清理事件监听器和状态
   */
  dispose = async () => {
    if (this.isDone) {
      return;
    }
    this.isDone = true;
    this.chatClient.off("ai_indicator.stop", this.handleStopGenerating);
    this.onDispose();
  };

  /**
   * 处理停止生成事件
   * @param event 停止生成事件对象
   */
  private handleStopGenerating = async (event: Event) => {
    if (this.isDone || event.message_id !== this.message.id) {
      return;
    }

    console.log("Stop generating for message", this.message.id);
    if (!this.openai || !this.openAiThread || !this.runId) {
      return;
    }

    try {
      // 取消线程运行事件，停止生成生成的回复文本
      await this.openai.beta.threads.runs.cancel(
        this.openAiThread.id,
        this.runId
      );
    } catch (e) {
      console.error("Error cancelling run", e);
    }

    // 发送线程运行事件，清除线程状态和生成的回复文本
    await this.channel.sendEvent({
      type: "ai_indicator.clear",
      cid: this.message.cid,
      message_id: this.message.id,
    });
    // 释放线程流事件处理程序资源
    await this.dispose();
  };

  /**
   * 处理 OpenAI 流式事件
   * 处理不同类型的事件：
   * 1. thread.run.created - 保存运行 ID
   * 2. thread.message.delta - 处理文本增量，实时更新消息
   * 3. thread.message.completed - 处理消息完成，更新最终内容
   * 4. thread.run.step.created - 处理步骤创建，更新 AI 状态
   * @param event OpenAI 流式事件对象
   */
  private handleStreamEvent = (
    event: OpenAI.Beta.Assistants.AssistantStreamEvent
  ) => {
    const { cid, id } = this.message;

    // 处理线程运行创建事件
    if (event.event === "thread.run.created") {
      // 保存运行 ID，用于后续操作
      this.runId = event.data.id;
    }
    // 处理消息增量事件（实时文本生成）
    else if (event.event === "thread.message.delta") {
      // 提取文本增量
      const textDelta = event.data.delta.content?.[0];
      
      // 处理文本内容
      if (textDelta?.type === "text" && textDelta.text) {
        // 累积文本内容
        this.messageText += textDelta.text.value || "";
        
        // 每 1 秒更新一次消息，避免频繁 API 调用
        const now = Date.now();
        if (now - this.lastUpdateTime > 1000) {
          this.chatClient.partialUpdateMessage(id, {
            set: { text: this.messageText },
          });
          this.lastUpdateTime = now;
        }
        
        // 增加分块计数器
        this.chunkCounter += 1;
      }
    }
    // 处理消息完成事件
    else if (event.event === "thread.message.completed") {
      // 更新最终消息内容
      this.chatClient.partialUpdateMessage(id, {
        set: {
          text:
            event.data.content[0].type === "text"
              ? event.data.content[0].text.value
              : this.messageText,
        },
      });
      
      // 清除 AI 状态指示器
      this.channel.sendEvent({
        type: "ai_indicator.clear",
        cid: cid,
        message_id: id,
      });
    }
    // 处理运行步骤创建事件
    else if (event.event === "thread.run.step.created") {
      // 当创建消息生成步骤时，更新 AI 状态为 "生成中"
      if (event.data.step_details.type === "message_creation") {
        this.channel.sendEvent({
          type: "ai_indicator.update",
          ai_state: "AI_STATE_GENERATING",
          cid: cid,
          message_id: id,
        });
      }
    }
  };

  /**
   * 处理错误事件
   * @param error 错误对象
   */
  private handleError = async (error: Error) => {
    if (this.isDone) {
      return;
    }
    await this.channel.sendEvent({
      type: "ai_indicator.update",
      ai_state: "AI_STATE_ERROR",
      cid: this.message.cid,
      message_id: this.message.id,
    });
    await this.chatClient.partialUpdateMessage(this.message.id, {
      set: {
        text: error.message ?? "Error generating the message",
        message: error.toString(),
      },
    });
    await this.dispose();
  };

  /**
   * 执行网络搜索
   * @param query 搜索查询字符串
   * @returns 搜索结果的 JSON 字符串
   */
  private performWebSearch = async (query: string): Promise<string> => {
    const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

    if (!TAVILY_API_KEY) {
      return JSON.stringify({
        error: "Web search is not available. API key not configured.",
      });
    }

    console.log(`Performing web search for: "${query}"`);

    // 发送 Tavily 搜索请求
    try {
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TAVILY_API_KEY}`,
        },
        body: JSON.stringify({
          query: query,
          search_depth: "advanced",
          max_results: 5,
          include_answer: true,
          include_raw_content: false,
        }),
      });

      // 检查响应状态码是否为成功（200）
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Tavily search failed for query "${query}":`, errorText);
        return JSON.stringify({
          error: `Search failed with status: ${response.status}`,
          details: errorText,
        });
      }

      // 解析响应 JSON 数据
      const data = await response.json();
      console.log(`Tavily search successful for query "${query}"`);

      // 返回搜索结果 JSON 字符串
      return JSON.stringify(data);
    } catch (error) {
      console.error(
        `An exception occurred during web search for "${query}":`,
        error
      );
      return JSON.stringify({
        error: "An exception occurred during the search.",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}