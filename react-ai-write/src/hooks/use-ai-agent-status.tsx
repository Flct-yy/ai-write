/**
 * AI 代理状态钩子
 * 用于管理和监控 AI 代理的连接状态
 */

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "/@/hooks/use-locale";
import { useToast } from "/@/hooks/use-toast";

/**
 * AI 代理状态类型
 */
export type AgentStatus = "disconnected" | "connecting" | "connected";

/**
 * 钩子属性接口
 */
interface UseAIAgentStatusProps {
  /** 频道 ID */
  channelId: string | null;
  /** 后端 API 地址 */
  backendUrl: string;
}

/**
 * AI 代理状态钩子
 * @param props 钩子属性
 * @returns AI 代理状态和控制方法
 */
export const useAIAgentStatus = ({
  channelId,
  backendUrl,
}: UseAIAgentStatusProps) => {
  // 初始状态为 "disconnected"，通过 effects 确定实际状态
  const [status, setStatus] = useState<AgentStatus>("disconnected");
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 错误信息
  const [error, setError] = useState<string | null>(null);
  // 国际化翻译函数
  const { t } = useLocale();
  // Toast 通知钩子
  const { toast } = useToast();

  /**
   * 检查后端的代理状态
   */
  const checkStatus = useCallback(async () => {
    // 如果没有频道 ID，设置为 disconnected 状态
    if (!channelId) {
      setStatus("disconnected");
      setLoading(false);
      return;
    }
    
    // 设置加载状态
    setLoading(true);

    try {
      // 发送请求检查代理状态
      const response = await fetch(
        `${backendUrl}/agent-status?channel_id=${channelId}`
      );
      
      if (response.ok) {
        // 成功获取状态
        const data = await response.json();
        setStatus(data.status);
      } else {
        // 响应失败，设置为 disconnected
        setStatus("disconnected");
      }
    } catch (err) {
      // 网络错误，设置为 disconnected
      console.error("Error checking agent status:", err);
      setStatus("disconnected");
    } finally {
      // 无论成功失败，都设置加载状态为 false
      setLoading(false);
    }
  }, [channelId, backendUrl]);

  /**
   * 刷新状态
   */
  const refreshStatus = useCallback(async () => {
    await checkStatus();
  }, [checkStatus]);

  /**
   * 连接 AI 代理
   */
  const connectAgent = useCallback(async () => {
    // 如果没有频道 ID 或正在加载，直接返回
    if (!channelId || loading) return;

    // 设置加载状态，清除错误，设置为 connecting 状态（乐观更新）
    setLoading(true);
    setError(null);
    setStatus("connecting");

    try {
      // 发送请求启动 AI 代理
      const response = await fetch(`${backendUrl}/start-ai-agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel_id: channelId,
          channel_type: "messaging",
        }),
      });

      if (!response.ok) {
        // 响应失败，设置错误信息，恢复为 disconnected 状态
        const errorData = await response.json();
        console.error(
          `[useAIAgentStatus] Failed to start agent for ${channelId}:`,
          errorData.reason
        );
        const errorMessage = errorData.reason || t('ai_agent.errors.failed_start');
        setError(errorMessage);
        setStatus("disconnected");
        // 显示错误 toast
        toast({
          title: t('ai_agent.messages.error'),
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        // 连接成功，显示成功 toast
        toast({
          title: t('ai_agent.messages.connected'),
          description: t('ai_agent.messages.agent_started'),
        });
      }
    } catch (err) {
      // 网络错误，设置错误信息，恢复为 disconnected 状态
      console.error(
        `[useAIAgentStatus] Network error starting AI agent for ${channelId}:`,
        err
      );
      const errorMessage = t('ai_agent.errors.network_start');
      setError(errorMessage);
      setStatus("disconnected");
      // 显示错误 toast
      toast({
        title: t('ai_agent.messages.error'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      // 无论成功失败，都检查最新状态
      await checkStatus();
    }
  }, [channelId, backendUrl, loading, checkStatus, t, toast]);

  /**
   * 断开 AI 代理
   */
  const disconnectAgent = useCallback(async () => {
    // 如果没有频道 ID 或正在加载，直接返回
    if (!channelId || loading) return;

    // 设置加载状态，清除错误
    setLoading(true);
    setError(null);

    try {
      // 发送请求停止 AI 代理
      const response = await fetch(`${backendUrl}/stop-ai-agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel_id: channelId,
        }),
      });

      if (!response.ok) {
        // 响应失败，设置错误信息
        const errorData = await response.json();
        console.error(
          `[useAIAgentStatus] Failed to stop agent for ${channelId}:`,
          errorData.reason
        );
        const errorMessage = errorData.reason || t('ai_agent.errors.failed_stop');
        setError(errorMessage);
        // 显示错误 toast
        toast({
          title: t('ai_agent.messages.error'),
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        // 响应成功，设置为 disconnected 状态（乐观更新）
        setStatus("disconnected");
        // 显示成功 toast
        toast({
          title: t('ai_agent.messages.disconnected'),
          description: t('ai_agent.messages.agent_stopped'),
        });
      }
    } catch (err) {
      // 网络错误，设置错误信息
      console.error(
        `[useAIAgentStatus] Network error stopping AI agent for ${channelId}:`,
        err
      );
      const errorMessage = t('ai_agent.errors.network_stop');
      setError(errorMessage);
      // 显示错误 toast
      toast({
        title: t('ai_agent.messages.error'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      // 无论成功失败，都检查最新状态
      await checkStatus();
    }
  }, [channelId, backendUrl, loading, checkStatus, t, toast]);

  /**
   * 切换代理连接状态
   */
  const toggleAgent = useCallback(async () => {
    if (status === "connected") {
      // 如果已连接，断开连接
      await disconnectAgent();
    } else {
      // 如果未连接，连接
      await connectAgent();
    }
  }, [status, connectAgent, disconnectAgent]);

  // 当频道 ID 变化时，检查状态
  useEffect(() => {
    checkStatus();
  }, [checkStatus]);
  
  // 定期轮询状态（每 2 分钟）
  useEffect(() => {
    if (channelId) {
      const interval = setInterval(checkStatus, 120000);
      return () => clearInterval(interval);
    }
  }, [channelId, checkStatus]);

  return {
    status,
    loading,
    error,
    connectAgent,
    disconnectAgent,
    toggleAgent,
    checkStatus: refreshStatus,
    setStatus,
  };
};
