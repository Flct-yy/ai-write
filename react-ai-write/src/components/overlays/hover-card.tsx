/**
 * 悬停卡片组件
 * 基于 Radix UI 的 HoverCard 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "/@/utils/classnames";
import { hoverCardContentClassName } from "./variants/hover-card";

/**
 * 悬停卡片根容器
 */
const HoverCard = HoverCardPrimitive.Root;

/**
 * 悬停卡片触发器
 */
const HoverCardTrigger = HoverCardPrimitive.Trigger;

/**
 * 悬停卡片内容
 * @param {React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>} props - 组件属性
 * @returns {React.ReactElement} 渲染的悬停卡片内容组件
 */
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(hoverCardContentClassName, className)}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
