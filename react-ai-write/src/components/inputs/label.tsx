/**
 * Label 组件
 * 
 * 一个基于 Radix UI 的自定义标签组件，用于为表单元素提供标签。
 * 
 * @example
 * ```tsx
 * import { Label } from "./components/inputs/label"
 * import { Input } from "./components/inputs/input"
 * 
 * function Example() {
 *   return (
 *     <div>
 *       <Label htmlFor="name">姓名</Label>
 *       <Input id="name" placeholder="请输入姓名" />
 *     </div>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps } from "class-variance-authority";

import { cn } from "/@/utils/classnames";
import { labelVariants } from "/@/components/inputs/variants/label";

/**
 * Label 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof LabelPrimitive.Root>>} ref - 组件引用
 * @returns {React.ReactElement} Label 组件实例
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
