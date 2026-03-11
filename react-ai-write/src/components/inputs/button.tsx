/**
 * Button 组件
 * 可定制的按钮组件，支持多种样式变体和尺寸
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <Button>默认按钮</Button>
 * 
 * // 不同变体
 * <Button variant="destructive">危险按钮</Button>
 * <Button variant="outline">轮廓按钮</Button>
 * 
 * // 不同尺寸
 * <Button size="sm">小按钮</Button>
 * <Button size="lg">大按钮</Button>
 * 
 * // 作为子组件（如链接）
 * <Button asChild>
 *   <a href="#">链接按钮</a>
 * </Button>
 * ```
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants/button";
import { cn } from "/@/utils/classnames";

/**
 * 按钮组件属性接口
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @extends VariantProps<typeof buttonVariants>
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  /**
   * 是否作为子组件处理，默认 false
   * 当设置为 true 时，会渲染为子元素的类型（如链接）
   */
  asChild?: boolean
};

/**
 * 按钮组件
 * @param className 自定义类名
 * @param variant 按钮变体样式
 * @param size 按钮尺寸
 * @param asChild 是否作为子组件处理
 * @param props 其他按钮属性
 * @param ref 引用
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // 根据 asChild 属性判断是否作为子组件处理
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
);
Button.displayName = "Button";

/**
 * 导出 Button 组件
 */
export { Button };
