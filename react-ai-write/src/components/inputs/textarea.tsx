/**
 * Textarea 组件
 * 多行文本输入框组件，支持标准的 HTML textarea 属性
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <Textarea placeholder="请输入内容" />
 * 
 * // 带行数限制
 * <Textarea rows={4} placeholder="请输入详细内容" />
 * 
 * // 带自定义类名
 * <Textarea className="w-full" placeholder="宽文本框" />
 * ```
 */

import * as React from "react";

import { cn } from "/@/utils/classnames";
import { textareaVariants } from "./variants/textarea";

/**
 * 多行文本输入框组件
 * @param className 自定义类名
 * @param props 其他文本框属性
 * @param ref 引用
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
);
Textarea.displayName = "Textarea";

/**
 * 导出 Textarea 组件
 */
export { Textarea };
