/**
 * ScrollArea 组件
 * 
 * 一个基于 Radix UI 的滚动区域组件，用于显示可滚动的内容。
 * 
 * @example
 * ```tsx
 * import { ScrollArea } from "./components/layout/scroll-area"
 * 
 * function Example() {
 *   return (
 *     <div className="relative h-64 w-64 border">
 *       <ScrollArea className="h-full w-full">
 *         <div className="p-4">
 *           <p>滚动区域内容...</p>
 *           <p>更多内容...</p>
 *           <p>更多内容...</p>
 *           <p>更多内容...</p>
 *           <p>更多内容...</p>
 *           <p>更多内容...</p>
 *           <p>更多内容...</p>
 *           <p>更多内容...</p>
 *         </div>
 *       </ScrollArea>
 *     </div>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "/@/utils/classnames";
import { scrollAreaRootClassName, scrollAreaViewportClassName, scrollAreaScrollbarClassName, scrollAreaScrollbarVerticalClassName, scrollAreaScrollbarHorizontalClassName, scrollAreaScrollbarThumbClassName } from "/@/components/layout/variants/scroll-area";

/**
 * ScrollArea 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof ScrollAreaPrimitive.Root>>} ref - 组件引用
 * @returns {React.ReactElement} ScrollArea 组件实例
 */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn(scrollAreaRootClassName, className)}
    {...props}
  >
    {/* 滚动视口 */}
    <ScrollAreaPrimitive.Viewport className={scrollAreaViewportClassName}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    {/* 垂直滚动条 */}
    <ScrollBar orientation="vertical" />
    {/* 水平滚动条 */}
    <ScrollBar orientation="horizontal" />
    {/* 滚动角 */}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));

// 设置组件显示名称，用于 React DevTools 调试
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

/**
 * ScrollBar 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>} ref - 组件引用
 * @returns {React.ReactElement} ScrollBar 组件实例
 */
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      scrollAreaScrollbarClassName,
      orientation === "vertical" &&
      scrollAreaScrollbarVerticalClassName,
      orientation === "horizontal" &&
      scrollAreaScrollbarHorizontalClassName,
      className
    )}
    {...props}
  >
    {/* 滚动条拇指 */}
    <ScrollAreaPrimitive.ScrollAreaThumb className={scrollAreaScrollbarThumbClassName} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

// 设置组件显示名称，用于 React DevTools 调试
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
