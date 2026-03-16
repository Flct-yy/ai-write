/**
 * 聊天输入组件
 * 
 * 提供一个文本输入区域，支持发送消息、停止生成、清除文本等功能
 */

// 导入按钮组件
import { Button } from "/@/components/inputs/button";
// 导入文本区域组件
import { Textarea } from "/@/components/inputs/textarea";
// 导入类名工具
import { cn } from "/@/utils/classnames";
// 导入图标
import { ArrowRight, Square, X } from "lucide-react";
// 导入React和相关钩子
import React, { useCallback, useEffect, useRef, useState } from "react";
// 导入国际化钩子
import { useLocale } from "../hooks/use-locale";
import { WritingPromptsToolbar } from "./WritingPromptsToolbar";

/**
 * 聊天输入组件属性接口
 */
export interface ChatInputProps {
  /** 自定义类名 */
  className?: string;
  /** 发送消息的回调函数 */
  sendMessage: (message: { text: string }) => Promise<void> | void;
  /** 是否正在生成内容 */
  isGenerating?: boolean;
  /** 停止生成的回调函数 */
  onStopGenerating?: () => void;
  /** 占位文本 */
  placeholder?: string;
  /** 输入值 */
  value: string;
  /** 值变化的回调函数 */
  onValueChange: (text: string) => void;
  /** 文本区域的引用 */
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  /** 是否显示提示工具栏 */
  showPromptToolbar?: boolean;
}

/**
 * 聊天输入组件
 * 
 * 提供一个文本输入区域，支持发送消息、停止生成、清除文本等功能
 */
export const ChatInput: React.FC<ChatInputProps> = ({
  className,
  sendMessage,
  isGenerating,
  onStopGenerating,
  placeholder,
  value,
  onValueChange,
  textareaRef: externalTextareaRef,
  showPromptToolbar = false,
}) => {
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 内部文本区域引用
  const internalTextareaRef = useRef<HTMLTextAreaElement>(null);
  // 使用外部提供的引用或内部引用
  const textareaRef = externalTextareaRef || internalTextareaRef;
  // 国际化钩子
  const { t } = useLocale();

  const handlePromptSelect = (prompt: string) => {
    // 追加提示到现有文本或设置为新文本
    // 如果现有文本为空，直接设置为提示
    onValueChange(value ? `${value.trim()} ${prompt}` : prompt);
    textareaRef.current?.focus();
  };

  /**
   * 更新文本区域高度
   * 
   * 自动调整文本区域的高度以适应内容
   */
  const updateTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120; // ~6 lines
      const textareaHeight = Math.min(scrollHeight, maxHeight);
      textarea.style.height = `${textareaHeight}px`;
    }
  }, [textareaRef]);

  // 当值变化时，更新文本区域高度
  useEffect(() => {
    updateTextareaHeight();
  }, [value, updateTextareaHeight]);

  /**
   * 处理表单提交
   * 
   * @param e 表单事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 如果没有内容、正在加载、正在生成或没有发送消息函数，则返回
    if (!value.trim() || isLoading || isGenerating || !sendMessage) return;

    // 设置加载状态
    setIsLoading(true);
    try {
      // 调用发送消息函数
      await sendMessage({
        text: value.trim(),
      });
      // 清空输入值
      onValueChange("");
      // 重置文本区域高度
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      // 无论成功失败，都设置加载状态为 false
      setIsLoading(false);
    }
  };

  /**
   * 处理键盘按下事件
   * 
   * @param e 键盘事件
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 当按下 Enter 键且没有按下 Shift 键时，提交表单
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-background",
        showPromptToolbar && "border-t border-border/50"
      )}
    >
      {showPromptToolbar && (
        <WritingPromptsToolbar onPromptSelect={handlePromptSelect} />
      )}
      <div className={cn("p-4", className)}>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            {/* 文本区域 */}
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder || t('placeholder')}
              className={cn(
                "min-h-[44px] max-h-[120px] resize-none py-3 pl-4 pr-20 text-sm",
                "border-input focus:border-primary/50 rounded-lg",
                "transition-colors duration-200 bg-background"
              )}
              disabled={isLoading || isGenerating}
            />

            {/* 清除按钮 */}
            {value.trim() && !isLoading && !isGenerating && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onValueChange("")}
                className="absolute right-12 bottom-2 h-8 w-8 rounded-md text-muted-foreground hover:text-foreground"
                title={t('clear_text')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            {/* 发送/停止按钮 */}
            {isGenerating ? (
              /* 停止生成按钮 */
              <Button
                type="button"
                onClick={onStopGenerating}
                className="absolute right-2 bottom-2 h-8 w-8 rounded-md flex-shrink-0 p-0"
                variant="destructive"
                title={t('stop_generating')}
              >
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              /* 发送按钮 */
              <Button
                type="submit"
                disabled={!value.trim() || isLoading || isGenerating}
                className={cn(
                  "absolute right-2 bottom-2 h-8 w-8 rounded-md flex-shrink-0 p-0",
                  "transition-all duration-200",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                  !value.trim() ? "bg-muted hover:bg-muted" : "",
                )}
                title={t('send')}
                variant={value.trim() ? "default" : "ghost"}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
