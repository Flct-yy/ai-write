/**
 * Switch 组件
 * 
 * 一个基于 Radix UI 的自定义开关组件，用于在表单中实现布尔值切换功能。
 * 
 * @example
 * ```tsx
 * import { Switch } from "./components/inputs/switch"
 * 
 * function Example() {
 *   return (
 *     <div>
 *       <Switch id="notifications" />
 *       <label htmlFor="notifications">启用通知</label>
 *     </div>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "/@/utils/classnames";
import { switchThumbVariant, switchVariant } from "./variants/switch";

/**
 * Switch 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof SwitchPrimitives.Root>>} ref - 组件引用
 * @returns {React.ReactElement} Switch 组件实例
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      switchVariant,
      className
    )}
    {...props}
    ref={ref}
  >
    {/* 开关滑块组件 */}
    <SwitchPrimitives.Thumb
      className={cn(
        switchThumbVariant
      )}
    />
  </SwitchPrimitives.Root>
));

// 设置组件显示名称，用于 React DevTools 调试
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
