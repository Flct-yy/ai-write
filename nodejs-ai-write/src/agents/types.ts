import type { Channel, StreamChat, User } from "stream-chat";

// 智能体接口
export interface AIAgent {
  // 用户信息
  user?: User;
  // 渠道信息
  channel: Channel;
  // Chat 客户端
  chatClient: StreamChat;
  // 获取最后交互时间
  getLastInteraction: () => number;
  // 初始化智能体
  init: () => Promise<void>;
  // 释放智能体资源
  dispose: () => Promise<void>;
}

// 智能体平台类型
export enum AgentPlatform {
  // 开放平台：OpenAI
  OPENAI = "openai",
  // 写作助手平台
  WRITING_ASSISTANT = "writing_assistant",
}

// 写作助手消息类型扩展
export interface WritingMessage {
  custom?: {
    // 消息类型：用户输入、AI 回复、系统消息
    messageType?: "user_input" | "ai_response" | "system_message";
    writingTask?: string;
    suggestions?: string[];
  };
}
