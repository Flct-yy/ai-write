/**
 * Card 组件
 * 
 * 一个用于显示内容的卡片组件，包含多个子组件用于构建完整的卡片布局。
 * 
 * @example
 * ```tsx
 * import {
 *   Card,
 *   CardHeader,
 *   CardTitle,
 *   CardDescription,
 *   CardContent,
 *   CardFooter
 * } from "./components/layout/card"
 * 
 * function Example() {
 *   return (
 *     <Card>
 *       <CardHeader>
 *         <CardTitle>卡片标题</CardTitle>
 *         <CardDescription>卡片描述信息</CardDescription>
 *       </CardHeader>
 *       <CardContent>
 *         卡片内容...
 *       </CardContent>
 *       <CardFooter>
 *         卡片底部内容
 *       </CardFooter>
 *     </Card>
 *   )
 * }
 * ```
 */
import * as React from "react";

import { cn } from "/@/utils/classnames";
import { cardHeaderVariants, cardTitleVariants, cardDescriptionVariants, cardVariants, cardContentVariants, cardFooterVariants } from "./variants/card";

/**
 * Card 组件
 * 
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @param {React.Ref<HTMLDivElement>} ref - 组件引用
 * @returns {React.ReactElement} Card 组件实例
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      cardVariants,
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
Card.displayName = "Card";

/**
 * CardHeader 组件
 * 
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @param {React.Ref<HTMLDivElement>} ref - 组件引用
 * @returns {React.ReactElement} CardHeader 组件实例
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardHeaderVariants, className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
CardHeader.displayName = "CardHeader";

/**
 * CardTitle 组件
 * 
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - 组件属性
 * @param {React.Ref<HTMLParagraphElement>} ref - 组件引用
 * @returns {React.ReactElement} CardTitle 组件实例
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      cardTitleVariants,
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
CardTitle.displayName = "CardTitle";

/**
 * CardDescription 组件
 * 
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - 组件属性
 * @param {React.Ref<HTMLParagraphElement>} ref - 组件引用
 * @returns {React.ReactElement} CardDescription 组件实例
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(cardDescriptionVariants, className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
CardDescription.displayName = "CardDescription";

/**
 * CardContent 组件
 * 
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @param {React.Ref<HTMLDivElement>} ref - 组件引用
 * @returns {React.ReactElement} CardContent 组件实例
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardContentVariants, className)} {...props} />
));

// 设置组件显示名称，用于 React DevTools 调试
CardContent.displayName = "CardContent";

/**
 * CardFooter 组件
 * 
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @param {React.Ref<HTMLDivElement>} ref - 组件引用
 * @returns {React.ReactElement} CardFooter 组件实例
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardFooterVariants, className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
