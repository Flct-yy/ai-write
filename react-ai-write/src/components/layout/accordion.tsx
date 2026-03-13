/**
 * Accordion 组件
 * 
 * 一个基于 Radix UI 的手风琴组件，用于显示可折叠的内容区域。
 * 
 * @example
 * ```tsx
 * import {
 *   Accordion,
 *   AccordionItem,
 *   AccordionTrigger,
 *   AccordionContent
 * } from "./components/layout/accordion"
 * 
 * function Example() {
 *   return (
 *     <Accordion type="single" collapsible>
 *       <AccordionItem value="item-1">
 *         <AccordionTrigger>项目 1</AccordionTrigger>
 *         <AccordionContent>
 *           项目 1 的内容...
 *         </AccordionContent>
 *       </AccordionItem>
 *       <AccordionItem value="item-2">
 *         <AccordionTrigger>项目 2</AccordionTrigger>
 *         <AccordionContent>
 *           项目 2 的内容...
 *         </AccordionContent>
 *       </AccordionItem>
 *     </Accordion>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { accordionContentVariants, accordionItemVariants, accordionTriggerIconVariants, accordionTriggerVariants } from "./variants/accordion";

/**
 * Accordion 组件
 * 
 * 基于 Radix UI 的 AccordionPrimitive.Root
 */
const Accordion = AccordionPrimitive.Root;

/**
 * AccordionItem 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Item>>} ref - 组件引用
 * @returns {React.ReactElement} AccordionItem 组件实例
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants, className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
AccordionItem.displayName = "AccordionItem";

/**
 * AccordionTrigger 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Trigger>>} ref - 组件引用
 * @returns {React.ReactElement} AccordionTrigger 组件实例
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    {/* 手风琴触发器组件 */}
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        accordionTriggerVariants,
        className
      )}
      {...props}
    >
      {children}
      {/* 下拉图标 */}
      <ChevronDown className={accordionTriggerIconVariants} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

// 设置组件显示名称，用于 React DevTools 调试
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * AccordionContent 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Content>>} ref - 组件引用
 * @returns {React.ReactElement} AccordionContent 组件实例
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants)}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

// 设置组件显示名称，用于 React DevTools 调试
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
