import { StreamChat } from "stream-chat";
import { apiKey, serverClient } from "../serverClient";
import { OpenAIAgent } from "./openai/OpenAIAgent";
import { AgentPlatform, AIAgent } from "./types";

// 创建智能体函数
export const createAgent = async (
  user_id: string,
  platform: AgentPlatform,
  channel_type: string,
  channel_id: string
): Promise<AIAgent> => {
  // 创建用户令牌
  const token = serverClient.createToken(user_id);
  // 创建用户 Chat 客户端
  const chatClient = new StreamChat(apiKey, undefined, {
    allowServerSideConnect: true,
  });

  // 连接用户到 Chat 客户端
  await chatClient.connectUser({ id: user_id }, token);
  // 获取渠道信息
  const channel = chatClient.channel(channel_type, channel_id);
  await channel.watch();

  // 初始化智能体
  switch (platform) {
    // 初始化 OpenAI 智能体
    case AgentPlatform.WRITING_ASSISTANT:
    // 初始化写作助手智能体
    case AgentPlatform.OPENAI:
      return new OpenAIAgent(chatClient, channel);
    default:
      throw new Error(`Unsupported agent platform: ${platform}`);
  }
};
