/**
 * AI 代理控制组件
 * 
 * 显示 AI 代理的状态，并提供连接/断开连接和刷新状态的功能
 */

// 导入徽章组件
import { Badge } from "/@/components/display/badge";
// 导入按钮组件
import { Button } from "/@/components/inputs/button";
// 导入 toast 钩子
import { useToast } from "/@/hooks/use-toast";
// 导入 AI 代理状态类型
import { AgentStatus } from "/@/hooks/use-ai-agent-status";
// 导入图标
import { AlertCircle, Bot, BotOff, Loader2, RotateCcw } from "lucide-react";
// 导入 React
import React from "react";
// 导入国际化钩子
import { useLocale } from "/@/hooks/use-locale";

/**
 * AI 代理控制组件属性接口
 */
interface AIAgentControlProps {
  /** 自定义类名 */
  className?: string;
  /** AI 代理状态 */
  status: AgentStatus;
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
  /** 切换 AI 代理状态的回调函数 */
  toggleAgent: () => Promise<void>;
  /** 检查 AI 代理状态的回调函数 */
  checkStatus: () => Promise<void>;
  /** 频道 ID */
  channelId?: string;
}

/**
 * AI 代理控制组件
 * 
 * 显示 AI 代理的状态，并提供连接/断开连接和刷新状态的功能
 */
export const AIAgentControl: React.FC<AIAgentControlProps> = ({
  className = "",
  status,
  loading,
  error,
  toggleAgent,
  checkStatus,
  channelId,
}) => {
  // 使用 toast 钩子
  const { toast } = useToast();
  // 获取国际化翻译函数
  const { t } = useLocale();

  /**
   * 获取状态配置
   * 
   * 根据 AI 代理的状态和加载状态，返回对应的配置信息
   * 
   * @param status AI 代理状态
   * @param loading 是否正在加载
   * @returns 状态配置对象，包含变体、颜色、图标和文本
   */
  const getStatusConfig = (status: AgentStatus, loading: boolean) => {
    // 如果正在加载，返回加载状态的配置
    if (loading) {
      return {
        variant: "secondary" as const,
        color: "text-orange-600 dark:text-orange-400",
        icon: Loader2,
        text: status === "connected" ? t('status.disconnecting') : t('status.connecting'),
      };
    }

    // 根据不同的状态返回对应的配置
    switch (status) {
      case "connected":
        return {
          variant: "default" as const,
          color: "text-green-600 dark:text-green-400",
          icon: Bot,
          text: t('status.connected'),
        };
      case "connecting":
        return {
          variant: "secondary" as const,
          color: "text-orange-600 dark:text-orange-400",
          icon: Loader2,
          text: t('status.connecting'),
        };
      case "disconnected":
      default:
        return {
          variant: "outline" as const,
          color: "text-muted-foreground",
          icon: BotOff,
          text: t('status.offline'),
        };
    }
  };

  // 获取状态配置
  const statusConfig = getStatusConfig(status, loading);
  // 获取状态图标组件
  const StatusIcon = statusConfig.icon;

  /**
   * 处理切换 AI 代理状态
   */
  const handleToggle = async () => {
    try {
      // 调用切换 AI 代理状态的回调函数
      await toggleAgent();
      // 显示 toast 通知
      toast({
        title: status === "connected" ? t('messages.disconnected') : t('messages.connected'),
        description:
          status === "connected"
            ? t('messages.turned_off')
            : t('messages.now_active'),
      });
    } catch (err) {
      // 显示错误 toast 通知
      toast({
        title: t('messages.error'),
        description: error || t('messages.failed_toggle'),
        variant: "destructive",
      });
    }
  };

  /**
   * 处理刷新 AI 代理状态
   */
  const handleRefresh = async () => {
    // 调用检查 AI 代理状态的回调函数
    await checkStatus();
    // 显示 toast 通知
    toast({
      title: t('messages.status_updated'),
      description: t('messages.status_refreshed'),
    });
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* 状态徽章 - 加载时旋转 */}
      <Badge
        variant={statusConfig.variant}
        className={`${statusConfig.color} px-2 py-1 text-xs font-medium`}
      >
        <StatusIcon
          className={`h-3 w-3 mr-1 ${loading || status === "connecting" ? "animate-spin" : ""
            }`}
        />
        {statusConfig.text}
      </Badge>

      {/* 错误指示器 */}
      {error && (
        <Badge variant="destructive" className="px-2 py-1 text-xs">
          <AlertCircle className="h-3 w-3 mr-1" />
          {t('actions.error')}
        </Badge>
      )}

      {/* 控制按钮 */}
      <div className="flex gap-1">
        <Button
          size="sm"
          variant={status === "connected" ? "outline" : "default"}
          onClick={handleToggle}
          disabled={loading || !channelId}
          className="h-8 px-3 text-xs"
        >
          {status === "connected" ? (
            <BotOff className="h-3 w-3" />
          ) : (
            <Bot className="h-3 w-3" />
          )}
          <span className="ml-1 hidden sm:inline">
            {status === "connected" ? t('actions.disconnect') : t('actions.connect')}
          </span>
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleRefresh}
          disabled={loading || !channelId}
          className="h-8 w-8 p-0"
          title={t('actions.refresh_status')}
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
