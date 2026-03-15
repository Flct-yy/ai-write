/**
 * 切换按钮组组件
 * 基于 Radix UI 的 ToggleGroup 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";


import { cn } from "/@/utils/classnames";
import { toggleVariants, type VariantProps as ToggleVariantProps } from "./variants/toggle";
import { toggleGroupRootClassName } from "./variants/toggle-group";

/**
 * 切换按钮组上下文
 */
const ToggleGroupContext = React.createContext<
  ToggleVariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

/**
 * 切换按钮组
 * @param {React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleVariantProps<typeof toggleVariants>} props - 组件属性
 * @returns {React.ReactElement} 渲染的切换按钮组组件
 */
const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    ToggleVariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(toggleGroupRootClassName, className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

/**
 * 切换按钮组项
 * @param {React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & ToggleVariantProps<typeof toggleVariants>} props - 组件属性
 * @returns {React.ReactElement} 渲染的切换按钮组项组件
 */
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    ToggleVariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
