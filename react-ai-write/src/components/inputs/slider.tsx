/**
 * Slider 组件
 * 
 * 一个基于 Radix UI 的自定义滑块组件，用于在表单中实现数值范围选择功能。
 * 
 * @example
 * ```tsx
 * import { Slider } from "./components/inputs/slider"
 * 
 * function Example() {
 *   return (
 *     <div>
 *       <Slider defaultValue={[50]} max={100} step={1} />
 *     </div>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "/@/utils/classnames";
import { sliderRangeVariant, sliderThumbVariant, sliderTrackVariant, sliderVariant } from "./variants/slider";

/**
 * Slider 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof SliderPrimitive.Root>>} ref - 组件引用
 * @returns {React.ReactElement} Slider 组件实例
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      sliderVariant,
      className
    )}
    {...props}
  >
    {/* 滑块轨道组件 */}
    <SliderPrimitive.Track className={sliderTrackVariant}>
      {/* 滑块范围组件，显示已选择的部分 */}
      <SliderPrimitive.Range className={sliderRangeVariant} />
    </SliderPrimitive.Track>
    {/* 滑块 thumb 组件，用于拖动调整值 */}
    <SliderPrimitive.Thumb className={sliderThumbVariant} />
  </SliderPrimitive.Root>
));

// 设置组件显示名称，用于 React DevTools 调试
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
