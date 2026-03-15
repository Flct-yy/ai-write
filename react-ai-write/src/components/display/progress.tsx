/**
 * 进度条组件
 * 基于 Radix UI 的 Progress 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "/@/utils/classnames";
import { progressRootClassName, progressIndicatorClassName } from "./variants/progress";

/**
 * 进度条
 * @param {React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>} props - 组件属性
 * @returns {React.ReactElement} 渲染的进度条组件
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressRootClassName, className)}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={progressIndicatorClassName}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
