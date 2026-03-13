/**
 * Separator 组件
 * 
 * 一个基于 Radix UI 的分隔线组件，用于在界面中分隔不同的内容区域。
 * 
 * @example
 * ```tsx
 * import { Separator } from "./components/layout/separator"
 * 
 * function Example() {
 *   return (
 *     <div>
 *       <p>上方内容</p>
 *       <Separator className="my-4" />
 *       <p>下方内容</p>
 *       
 *       <div className="flex items-center space-x-4">
 *         <p>左侧内容</p>
 *         <Separator orientation="vertical" className="h-8" />
 *         <p>右侧内容</p>
 *       </div>
 *     </div>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "/@/utils/classnames";
import { separatorClassName, separatorHorizontalClassName, separatorVerticalClassName } from "./variants/separator";

/**
 * Separator 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof SeparatorPrimitive.Root>>} ref - 组件引用
 * @returns {React.ReactElement} Separator 组件实例
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorClassName,
        orientation === "horizontal" ? separatorHorizontalClassName : separatorVerticalClassName,
        className
      )}
      {...props}
    />
  )
);

// 设置组件显示名称，用于 React DevTools 调试
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
