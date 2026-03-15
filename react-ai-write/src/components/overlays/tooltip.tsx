/**
 * 工具提示组件
 * 基于 Radix UI 的 Tooltip 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "/@/utils/classnames";
import { tooltipContentClassName } from "./variants/tooltip";

/**
 * 工具提示提供者
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * 工具提示根容器
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * 工具提示触发器
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * 工具提示内容
 * @param {React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>} props - 组件属性
 * @returns {React.ReactElement} 渲染的工具提示内容组件
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentClassName, className)}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
