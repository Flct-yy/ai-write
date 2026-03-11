/**
 * Checkbox 组件
 * 
 * 一个基于 Radix UI 的自定义复选框组件，用于在表单中实现布尔值选择。
 * 
 * @example
 * ```tsx
 * import { Checkbox } from "./components/inputs/checkbox"
 * 
 * function Example() {
 *   return (
 *     <div>
 *       <Checkbox id="terms" />
 *       <label htmlFor="terms">我同意服务条款</label>
 *     </div>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { checkboxCheckIconVariants, checkboxIndicatorVariants, checkboxVariants } from "./variants/checkbox";

/**
 * Checkbox 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof CheckboxPrimitive.Root>>} ref - 组件引用
 * @returns {React.ReactElement} Checkbox 组件实例
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      checkboxVariants,
      className
    )}
    {...props}
  >
    {/* 复选框指示器，用于显示选中状态 */}
    <CheckboxPrimitive.Indicator
      className={cn(checkboxIndicatorVariants)}
    >
      {/* 勾选图标，当复选框被选中时显示 */}
      <Check className={cn(checkboxCheckIconVariants)} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

// 设置组件显示名称，用于 React DevTools 调试
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
