/**
 * 切换按钮组件
 * 基于 Radix UI 的 Toggle 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

import { cn } from "/@/utils/classnames";
import { toggleVariants, type VariantProps } from "./variants/toggle";

/**
 * 切换按钮
 * @param {React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>} props - 组件属性
 * @returns {React.ReactElement} 渲染的切换按钮组件
 */
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
