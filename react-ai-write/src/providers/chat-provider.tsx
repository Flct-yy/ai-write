/**
 * ChatProvider 组件
 * 
 * 为应用提供 Stream Chat 功能，管理聊天客户端的创建和认证
 */

import { ReactNode, useCallback } from "react";
import { User } from "stream-chat";
import { Chat, useCreateChatClient } from "stream-chat-react";
import LoadingScreen from "/@/pages/loading-screen";
import { useTheme } from "/@/hooks/use-theme";

/**
 * ChatProvider 组件属性
 */
interface ChatProviderProps {
  /**
   * 当前登录的用户信息
   */
  user: User;
  /**
   * 子组件
   */
  children: ReactNode;
}

// 从环境变量获取 Stream API 密钥
const apiKey = import.meta.env.VITE_STREAM_API_KEY as string;
// 从环境变量获取后端 API 地址
const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

// 验证 API 密钥是否存在
if (!apiKey) {
  throw new Error("缺少 VITE_STREAM_API_KEY 环境变量");
}

/**
 * ChatProvider 组件
 * 
 * 负责创建和管理 Stream Chat 客户端，处理认证和主题设置
 */
export const ChatProvider = ({ user, children }: ChatProviderProps) => {
  // 获取当前主题
  const { theme } = useTheme();

  /**
   * 令牌提供者函数，从后端获取认证令牌
   * 
   * 当以下情况发生时，Stream Chat 客户端会自动调用此函数：
   * - 建立初始连接时
   * - 令牌过期需要刷新时
   * - 网络问题后重新建立连接时
   */
  const tokenProvider = useCallback(async () => {
    if (!user) {
      throw new Error("用户信息不可用");
    }

    try {
      // 向后端发送请求获取令牌
      const response = await fetch(`${backendUrl}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      // 检查响应是否成功
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`获取令牌失败: ${errorText}`);
      }

      // 解析响应并返回令牌
      const { token } = await response.json();
      return token;
    } catch (err) {
      console.error("获取令牌时出错:", err);
      throw err;
    }
  }, [user]);

  /**
   * 创建 Stream Chat 客户端，自动管理令牌
   * 
   * 此钩子处理：
   * - 初始认证
   * - WebSocket 连接管理
   * - 自动令牌刷新
   * - 实时事件处理
   */
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: tokenProvider,
    userData: user,
  });

  // 客户端初始化时显示加载屏幕
  if (!client) {
    return <LoadingScreen />;
  }

  return (
    <Chat
      client={client}
      // 根据当前主题设置聊天界面主题
      theme={
        theme === "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"
      }
    >
      {children}
    </Chat>
  );
};
