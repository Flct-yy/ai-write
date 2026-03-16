/**
 * ChatProvider 组件
 * 
 * 为应用提供 Stream Chat 功能，管理聊天客户端的创建和认证
 */

import { ReactNode, useCallback, useState, useEffect } from "react";
import { User, Event } from "stream-chat";
import { Chat, useCreateChatClient } from "stream-chat-react";
import LoadingScreen from "/@/pages/LoadingScreen";
import { useTheme } from "/@/hooks/use-theme";
import { useToast } from "/@/hooks/use-toast";

/**
 * 错误事件类型
 */
interface ErrorEvent extends Event {
  error: Error;
}

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
  // 使用提示框钩子
  const { toast } = useToast();
  // 错误状态
  const [error, setError] = useState<string | null>(null);

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
      const errorMsg = "用户信息不可用";
      setError(errorMsg);
      toast({
        title: "认证错误",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
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
        const errorMsg = `获取令牌失败: ${errorText}`;
        setError(errorMsg);
        toast({
          title: "认证错误",
          description: errorMsg,
          variant: "destructive",
        });
        throw new Error(errorMsg);
      }

      // 解析响应并返回令牌
      const { token } = await response.json();
      // 清除错误状态
      setError(null);
      return token;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "获取令牌时出错";
      setError(errorMsg);
      toast({
        title: "认证错误",
        description: errorMsg,
        variant: "destructive",
      });
      console.error("获取令牌时出错:", err);
      throw err;
    }
  }, [user, toast]);

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

  // 监听客户端错误事件
  useEffect(() => {
    if (client) {
      // 监听连接错误
      const handleConnectionError = (event: ErrorEvent) => {
        const errorMsg = `连接错误: ${event.error?.message || '未知错误'}`;
        setError(errorMsg);
        toast({
          title: "连接错误",
          description: errorMsg,
          variant: "destructive",
        });
        console.error("Chat client connection error:", event);
      };

      // 监听一般错误
      const handleError = (event: ErrorEvent) => {
        const errorMsg = `聊天错误: ${event.error?.message || '未知错误'}`;
        setError(errorMsg);
        toast({
          title: "聊天错误",
          description: errorMsg,
          variant: "destructive",
        });
        console.error("Chat client error:", event);
      };

      // 监听令牌错误
      const handleTokenError = () => {
        const errorMsg = "令牌无效或已过期";
        setError(errorMsg);
        toast({
          title: "认证错误",
          description: errorMsg,
          variant: "destructive",
        });
        console.error("Chat client token error");
      };

      // 添加事件监听器
      client.on("connection.error", handleConnectionError);
      client.on("error", handleError);
      client.on("token.expired", handleTokenError);

      // 清理事件监听器
      return () => {
        client.off("connection.error", handleConnectionError);
        client.off("error", handleError);
        client.off("token.expired", handleTokenError);
      };
    }
  }, [client, toast]);

  // 客户端初始化时显示加载屏幕
  if (!client) {
    return <LoadingScreen isError={error !== null} />;
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
