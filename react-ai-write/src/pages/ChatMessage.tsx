/**
 * 聊天消息组件
 * 
 * 用于显示聊天界面中的消息，支持用户消息和AI消息
 * 包含消息内容、时间戳、复制功能和AI状态显示
 */

// 导入头像组件
import { Avatar, AvatarFallback } from "/@/components/display/avatar";
// 导入按钮组件
import { Button } from "/@/components/inputs/button";
// 导入类名工具函数
import { cn } from "/@/utils/classnames";
// 导入图标
import {
  Bot,    // 机器人图标
  Check,  // 检查图标
  Copy,   // 复制图标
} from "lucide-react";
// 导入React和相关钩子
import React, { useState } from "react";
// 导入Markdown渲染组件
import ReactMarkdown from "react-markdown";
// 导入Stream Chat相关钩子
import {
  useAIState,          // AI状态钩子
  useChannelStateContext, // 频道状态上下文
  useMessageContext,   // 消息上下文
  useMessageTextStreaming, // 消息文本流式渲染
} from "stream-chat-react";
// 导入国际化钩子
import { useLocale } from "/@/hooks/use-locale";

/**
 * 聊天消息组件
 * 
 * 处理单个聊天消息的显示，包括消息内容、时间戳、复制功能和AI状态
 */
const ChatMessage: React.FC = () => {
  // 从上下文获取消息对象
  const { message } = useMessageContext();
  // 从上下文获取频道对象
  const { channel } = useChannelStateContext();
  // 获取AI状态
  const { aiState } = useAIState(channel);
  // 获取国际化翻译函数
  const { t } = useLocale();

  // 使用消息文本流式渲染钩子，实现打字机效果
  const { streamedMessageText } = useMessageTextStreaming({
    text: message.text ?? "",
    renderingLetterCount: 10,     // 每次渲染的字母数量
    streamingLetterIntervalMs: 50, // 渲染间隔毫秒
  });

  // 判断是否为用户消息
  const isUser = !message.user?.id?.startsWith("ai-bot");
  // 复制状态，用于显示复制成功提示
  const [copied, setCopied] = useState(false);

  /**
   * 复制消息文本到剪贴板
   * 
   * @returns Promise<void>
   */
  const copyToClipboard = async () => {
    if (streamedMessageText) {
      await navigator.clipboard.writeText(streamedMessageText);
      setCopied(true);
      // 2秒后重置复制状态
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /**
   * 获取AI状态对应的消息文本
   * 
   * @returns 状态消息文本或null
   */
  const getAiStateMessage = () => {
    switch (aiState) {
      case "AI_STATE_THINKING":
        return t('ai_states.thinking');
      case "AI_STATE_GENERATING":
        return t('ai_states.generating');
      case "AI_STATE_EXTERNAL_SOURCES":
        return t('ai_states.accessing_sources');
      case "AI_STATE_ERROR":
        return t('ai_states.error');
      default:
        return null;
    }
  };

  /**
   * 格式化时间戳为本地时间字符串
   * 
   * @param timestamp 时间戳
   * @returns 格式化后的时间字符串
   */
  const formatTime = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={cn(
        "flex w-full mb-4 px-4 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[70%] sm:max-w-[60%] lg:max-w-[50%]",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* 头像 - 仅AI消息显示 */}
        {!isUser && (
          <div className="flex-shrink-0 mr-3 self-end">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-muted text-muted-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* 消息内容容器 */}
        <div className="flex flex-col space-y-1">
          {/* 消息气泡 */}
          <div
            className={cn(
              "px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-200",
              isUser
                ? "str-chat__message-bubble str-chat__message-bubble--me rounded-br-md"
                : "str-chat__message-bubble rounded-bl-md"
            )}
          >
            {/* 消息文本 - 使用Markdown渲染 */}
            <div className="break-words">
              <ReactMarkdown
                components={{
                  // 段落组件
                  p: ({ children }) => (
                    <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
                  ),
                  // 代码组件 - 区分行内代码和代码块
                  code: ({ children, ...props }) => {
                    const { node, ...rest } = props;
                    const isInline = !rest.className?.includes("language-");

                    return isInline ? (
                      <code
                        className="px-1.5 py-0.5 rounded text-xs font-mono bg-black/10 dark:bg-white/10"
                        {...rest}
                      >
                        {children}
                      </code>
                    ) : (
                      <pre className="p-3 rounded-md overflow-x-auto my-2 text-xs font-mono bg-black/5 dark:bg-white/5">
                        <code {...rest}>{children}</code>
                      </pre>
                    );
                  },
                  // 无序列表组件
                  ul: ({ children }) => (
                    <ul className="list-disc ml-4 mb-3 space-y-1">
                      {children}
                    </ul>
                  ),
                  // 有序列表组件
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-4 mb-3 space-y-1">
                      {children}
                    </ol>
                  ),
                  // 列表项组件
                  li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  // 引用组件
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-3 pl-3 my-2 italic border-current/30">
                      {children}
                    </blockquote>
                  ),
                  // 一级标题组件
                  h1: ({ children }) => (
                    <h1 className="text-lg font-semibold mb-2 mt-4 first:mt-0">
                      {children}
                    </h1>
                  ),
                  // 二级标题组件
                  h2: ({ children }) => (
                    <h2 className="text-base font-semibold mb-2 mt-3 first:mt-0">
                      {children}
                    </h2>
                  ),
                  // 三级标题组件
                  h3: ({ children }) => (
                    <h3 className="text-sm font-semibold mb-2 mt-3 first:mt-0">
                      {children}
                    </h3>
                  ),
                  // 粗体组件
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  // 斜体组件
                  em: ({ children }) => <em className="italic">{children}</em>,
                }}
              >
                {/* 显示流式消息文本或静态消息文本 */}
                {streamedMessageText || message.text || ""}
              </ReactMarkdown>
            </div>

            {/* AI加载状态 - 仅在AI生成消息时显示 */}
            {aiState && !streamedMessageText && !message.text && (
              <div className="flex items-center gap-2 mt-2 pt-2">
                <span className="text-xs opacity-70">
                  {getAiStateMessage()}
                </span>
                {/* 打字动画 */}
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-current rounded-full typing-dot opacity-70"></div>
                  <div className="w-1 h-1 bg-current rounded-full typing-dot opacity-70"></div>
                  <div className="w-1 h-1 bg-current rounded-full typing-dot opacity-70"></div>
                </div>
              </div>
            )}
          </div>

          {/* 时间戳和操作按钮 */}
          <div className="flex items-center justify-between px-1">
            {/* 时间戳 - 始终左对齐 */}
            <span className="text-xs text-muted-foreground/70">
              {formatTime(message.created_at || new Date())}
            </span>

            {/* 操作按钮 - 仅AI消息显示，始终右对齐 */}
            {!isUser && !!streamedMessageText && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-6 px-2 text-xs hover:bg-muted rounded-md"
                >
                  {/* 复制按钮 - 根据复制状态显示不同内容 */}
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1 text-green-600" />
                      <span className="text-green-600">{t('actions.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      <span>{t('actions.copy')}</span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
