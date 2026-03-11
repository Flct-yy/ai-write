/**
 * RadioGroup 组件
 * 
 * 一个基于 Radix UI 的自定义单选框组组件，用于在表单中实现单选功能。
 * 
 * @example
 * ```tsx
 * import { RadioGroup, RadioGroupItem } from "./components/inputs/radio-group"
 * 
 * function Example() {
 *   return (
 *     <RadioGroup defaultValue="apple">
 *       <RadioGroupItem value="apple">Apple</RadioGroupItem>
 *       <RadioGroupItem value="banana">Banana</RadioGroupItem>
 *       <RadioGroupItem value="orange">Orange</RadioGroupItem>
 *     </RadioGroup>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { radioGroupVariants, radioGroupItemVariants, radioGroupItemIndicatorVariants, radioGroupItemIndicatorIconVariants } from "./variants/radio-group";

/**
 * RadioGroup 根组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof RadioGroupPrimitive.Root>>} ref - 组件引用
 * @returns {React.ReactElement} RadioGroup 组件实例
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants, className)}
      {...props}
      ref={ref}
    />
  );
});

// 设置组件显示名称，用于 React DevTools 调试
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

/**
 * RadioGroupItem 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { children?: React.ReactNode }} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof RadioGroupPrimitive.Item>>} ref - 组件引用
 * @returns {React.ReactElement} RadioGroupItem 组件实例
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, value, children, ...props }, ref) => {
  const id = value ? `item-${value}` : `radio-group-item-${Math.random().toString(36).substring(2) + Date.now()}`;
  return (
    <div className="flex items-center">
      {/* Radix UI RadioGroup Item 组件 */}
      <RadioGroupPrimitive.Item
        id={id}
        ref={ref}
        className={cn(
          radioGroupItemVariants,
          className
        )}
        value={value}
        {...props}
      >
        {/* 单选框指示器，用于显示选中状态 */}
        <RadioGroupPrimitive.Indicator className={radioGroupItemIndicatorVariants}>
          {/* 圆形图标，当单选框被选中时显示 */}
          <Circle className={radioGroupItemIndicatorIconVariants} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {/* 显示单选框的文本内容 */}
      {children ? <label htmlFor={id} className="ml-2">{children}</label> : null}
    </div>
  )
})

// 设置组件显示名称，用于 React DevTools 调试
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }