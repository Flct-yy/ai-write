/**
 * 弹出框组件
 * 基于 Radix UI 的 Popover 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "/@/utils/classnames";
import { popoverContentClassName } from "./variants/popover";

/**
 * 弹出框根容器
 */
const Popover = PopoverPrimitive.Root;

/**
 * 弹出框触发器
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * 弹出框内容
 * @param {React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>} props - 组件属性
 * @returns {React.ReactElement} 渲染的弹出框内容组件
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverContentClassName, className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
