import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { apiKey, serverClient } from "./serverClient";
import { createAgent } from "./agents/createAgent";
import { AgentPlatform, AIAgent } from "./agents/types";

// 初始化 Express 应用
const app = express();

// 配置 Express 应用，启用 JSON 解析和 CORS 中间件
app.use(express.json());
app.use(cors({ origin: "*" }));

// AI Agent 实例缓存，键为用户 ID，值为 AI Agent 实例
const aiAgentCache = new Map<string, AIAgent>();
// 待处理 AI Agent 集合，用于防止同时创建多个相同渠道的智能体
const pendingAiAgents = new Set<string>();

// TODO: 暂定为 8 小时，后续根据需要调整过期时间策略
const inactivityThreshold = 480 * 60 * 1000;
// 定时检查过期期智能体并释放资源
setInterval(async () => {
  const now = Date.now();
  for (const [userId, aiAgent] of aiAgentCache) {
    // 检查智能体是否过期
    if (now - aiAgent.getLastInteraction() > inactivityThreshold) {
      console.log(`Disposing AI Agent due to inactivity: ${userId}`);
      await disposeAiAgent(aiAgent);
      aiAgentCache.delete(userId);
    }
  }
}, 5000);

// 根路径，返回服务器状态和活动智能体数量
app.get("/", (req, res) => {
  res.json({
    message: "AI Writing Assistant Server is running",
    apiKey: apiKey,
    activeAgents: aiAgentCache.size,
  });
});

// 智能体启动端点，用于启动用户体的运行状态
app.post("/start-ai-agent", async (req, res) => {
  const { channel_id, channel_type = "messaging" } = req.body;
  console.log(`[API] /start-ai-agent called for channel: ${channel_id}`);

  // validation 验证请求体中是否包含 channel_id 字段
  if (!channel_id) {
    res.status(400).json({ error: "Missing required channel_id" });
    return;
  }

  // 根据渠道 ID 生成用户 ID，确保用户在系统中唯一标识
  const user_id = `ai-bot-${channel_id.replace(/[!]/g, "")}`;

  try {
    // 防止同时创建多个相同渠道的智能体
    if (!aiAgentCache.has(user_id) && !pendingAiAgents.has(user_id)) {
      console.log(`[API] Creating new agent for ${user_id}`);
      pendingAiAgents.add(user_id);

      // 创建用户并系统中添加到指定渠道
      await serverClient.upsertUser({
        id: user_id,
        name: "AI Writing Assistant",
      });

      // 加系统中添加用户到指定渠道
      const channel = serverClient.channel(channel_type, channel_id);
      await channel.addMembers([user_id]);

      // 创建并初始化用户体实例
      const agent = await createAgent(
        user_id,
        AgentPlatform.OPENAI,
        channel_type,
        channel_id
      );

      await agent.init();
      // 最终检查，防止在初始化过程中系统中已存在相同用户的智能体实例
      if (aiAgentCache.has(user_id)) {
        await agent.dispose();
      } else {
        aiAgentCache.set(user_id, agent);
      }
    } else {
      console.log(`AI Agent ${user_id} already started or is pending.`);
    }

    // 返回成功响应，包含用户体的连接状态和数据列表（当前为空）
    res.json({ message: "AI Agent started", data: [] });
  } catch (error) {
    // 处理异常情况，返回错误响应和错误信息
    const errorMessage = (error as Error).message;
    console.error("Failed to start AI Agent", errorMessage);
    res
      .status(500)
      .json({ error: "Failed to start AI Agent", reason: errorMessage });
  } finally {
    // 确保在任何情况下都从待处理集合中移除用户 ID，避免重复创建
    pendingAiAgents.delete(user_id);
  }
});

// 智能体停止端点，用于停止用户体的运行状态
app.post("/stop-ai-agent", async (req, res) => {
  const { channel_id } = req.body;
  console.log(`[API] /stop-ai-agent called for channel: ${channel_id}`);
  // 根据渠道 ID 生成用户 ID，确保用户在系统中唯一标识
  const user_id = `ai-bot-${channel_id.replace(/[!]/g, "")}`;
  try {
    // 检查用户体是否已连接、连接中或已断开
    const aiAgent = aiAgentCache.get(user_id);
    if (aiAgent) {
      console.log(`[API] Disposing agent for ${user_id}`);
      await disposeAiAgent(aiAgent);
      aiAgentCache.delete(user_id);
    } else {
      console.log(`[API] Agent for ${user_id} not found in cache.`);
    }
    // 返回成功响应，包含用户体的连接状态和数据列表（当前为空）
    res.json({ message: "AI Agent stopped", data: [] });
  } catch (error) {
    // 处理异常情况，返回错误响应和错误信息
    const errorMessage = (error as Error).message;
    console.error("Failed to stop AI Agent", errorMessage);
    res
      .status(500)
      .json({ error: "Failed to stop AI Agent", reason: errorMessage });
  }
});

// 智能体状态查询端点，用于查询用户体的连接状态
app.get("/agent-status", (req, res) => {
  const { channel_id } = req.query;
  // 验证查询参数中是否包含 channel_id 字段
  if (!channel_id || typeof channel_id !== "string") {
    return res.status(400).json({ error: "Missing channel_id" });
  }
  // 根据渠道 ID 生成用户 ID，确保用户在系统中唯一标识
  const user_id = `ai-bot-${channel_id.replace(/[!]/g, "")}`;
  console.log(
    `[API] /agent-status called for channel: ${channel_id} (user: ${user_id})`
  );

  // 检查用户体是否已连接、连接中或已断开
  if (aiAgentCache.has(user_id)) {
    console.log(`[API] Status for ${user_id}: connected`);
    res.json({ status: "connected" });
  } else if (pendingAiAgents.has(user_id)) {
    console.log(`[API] Status for ${user_id}: connecting`);
    res.json({ status: "connecting" });
  } else {
    console.log(`[API] Status for ${user_id}: disconnected`);
    res.json({ status: "disconnected" });
  }
});

// Token生成安全的访问令牌端点，用于用户认证和授权系统
app.post("/token", async (req, res) => {
  try {
    const { userId } = req.body;

    // 验证请求体中是否包含 userId 字段
    if (!userId) {
      return res.status(400).json({
        error: "userId is required",
      });
    }

    // token，设置为 1 小时后过期时间
    const expiration = Math.floor(Date.now() / 1000) + 60 * 60; // 1 小时后过期

    const token = serverClient.createToken(userId, expiration);

    // 返回生成的 token
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({
      error: "Failed to generate token",
    });
  }
});

// 释放方法体资源，包括用户和线程状态
async function disposeAiAgent(aiAgent: AIAgent) {
  await aiAgent.dispose();
  if (!aiAgent.user) {
    return;
  }
  // 删除用户账户，设置为硬删除（删除所有相关数据）
  // 注意：这会永久删除用户数据，确保在测试或开发环境中使用
  await serverClient.deleteUser(aiAgent.user.id, {
    hard_delete: true,
  });
}

// 启动 Express 服务器，监听端口 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
