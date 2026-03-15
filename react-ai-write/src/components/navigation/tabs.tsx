/**
 * 标签页组件
 * 基于 Radix UI 的 Tabs 组件封装，提供统一的样式和 API
 */
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "/@/utils/classnames"
import {
  tabsListClassName,
  tabsTriggerClassName,
  tabsContentClassName
} from "./variants/tabs"

/**
 * 标签页根容器
 */
const Tabs = TabsPrimitive.Root

/**
 * 标签页列表组件
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>} props - 组件属性
 * @returns {React.ReactElement} 渲染的标签页列表组件
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListClassName, className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * 标签页触发器组件
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>} props - 组件属性
 * @returns {React.ReactElement} 渲染的标签页触发器组件
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerClassName, className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * 标签页内容组件
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>} props - 组件属性
 * @returns {React.ReactElement} 渲染的标签页内容组件
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentClassName, className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
