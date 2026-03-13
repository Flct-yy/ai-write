/**
 * Breadcrumb 组件
 * 
 * 一个基于 Radix UI 的面包屑导航组件，用于显示用户在网站中的位置。
 * 
 * @example
 * ```tsx
 * import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "./components/navigation/breadcrumb"
 * 
 * function Example() {
 *   return (
 *     <Breadcrumb>
 *       <BreadcrumbList>
 *         <BreadcrumbItem>
 *           <BreadcrumbLink href="/">首页</BreadcrumbLink>
 *         </BreadcrumbItem>
 *         <BreadcrumbSeparator />
 *         <BreadcrumbItem>
 *           <BreadcrumbLink href="/products">产品</BreadcrumbLink>
 *         </BreadcrumbItem>
 *         <BreadcrumbSeparator />
 *         <BreadcrumbItem>
 *           <BreadcrumbPage>详情页</BreadcrumbPage>
 *         </BreadcrumbItem>
 *       </BreadcrumbList>
 *     </Breadcrumb>
 *   )
 * }
 * ```
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { breadcrumbEllipsisClassName, breadcrumbItemClassName, breadcrumbLinkClassName, breadcrumbListClassName, breadcrumbPageClassName, breadcrumbSeparatorClassName } from "./variants/breadcrumb";

/**
 * 面包屑导航容器
 * 
 * @param {React.ComponentPropsWithoutRef<"nav"> & { separator?: React.ReactNode }} props - 组件属性
 * @param {React.ReactNode} props.separator - 自定义分隔符
 * @param {React.Ref<HTMLElement>} ref - 组件引用
 * @returns {React.ReactElement} Breadcrumb 组件实例
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);

// 设置组件显示名称，用于 React DevTools 调试
Breadcrumb.displayName = "Breadcrumb";

/**
 * 面包屑列表
 * 
 * @param {React.ComponentPropsWithoutRef<"ol">} props - 组件属性
 * @param {React.Ref<HTMLOListElement>} ref - 组件引用
 * @returns {React.ReactElement} BreadcrumbList 组件实例
 */
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      breadcrumbListClassName,
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
BreadcrumbList.displayName = "BreadcrumbList";

/**
 * 面包屑项
 * 
 * @param {React.ComponentPropsWithoutRef<"li">} props - 组件属性
 * @param {React.Ref<HTMLLIElement>} ref - 组件引用
 * @returns {React.ReactElement} BreadcrumbItem 组件实例
 */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(breadcrumbItemClassName, className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * 面包屑链接
 * 
 * @param {React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }} props - 组件属性
 * @param {boolean} props.asChild - 是否作为子组件渲染
 * @param {React.Ref<HTMLAnchorElement>} ref - 组件引用
 * @returns {React.ReactElement} BreadcrumbLink 组件实例
 */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  // 根据 asChild 属性决定使用 Slot 还是 a 标签
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn(breadcrumbLinkClassName, className)}
      {...props}
    />
  )
});

// 设置组件显示名称，用于 React DevTools 调试
BreadcrumbLink.displayName = "BreadcrumbLink";

/**
 * 面包屑当前页
 * 
 * @param {React.ComponentPropsWithoutRef<"span">} props - 组件属性
 * @param {React.Ref<HTMLSpanElement>} ref - 组件引用
 * @returns {React.ReactElement} BreadcrumbPage 组件实例
 */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(breadcrumbPageClassName, className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
BreadcrumbPage.displayName = "BreadcrumbPage";

/**
 * 面包屑分隔符
 * 
 * @param {React.ComponentProps<"li">} props - 组件属性
 * @param {React.ReactNode} props.children - 自定义分隔符内容
 * @returns {React.ReactElement} BreadcrumbSeparator 组件实例
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn(breadcrumbSeparatorClassName, className)}
    {...props}
  >
    {/* 使用自定义分隔符或默认的 ChevronRight 图标 */}
    {children ?? <ChevronRight />}
  </li>
);

// 设置组件显示名称，用于 React DevTools 调试
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/**
 * 面包屑省略号
 * 
 * @param {React.ComponentProps<"span">} props - 组件属性
 * @returns {React.ReactElement} BreadcrumbEllipsis 组件实例
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(breadcrumbEllipsisClassName, className)}
    {...props}
  >
    {/* 显示省略号图标 */}
    <MoreHorizontal className="h-4 w-4" />
    {/* 为屏幕阅读器添加文本 */}
    <span className="sr-only">More</span>
  </span>
);

// 设置组件显示名称，用于 React DevTools 调试
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
