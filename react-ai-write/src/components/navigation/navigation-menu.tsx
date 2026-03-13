/**
 * NavigationMenu 组件
 * 
 * 一个基于 Radix UI 的导航菜单组件，用于创建带有下拉菜单的导航栏。
 * 
 * @example
 * ```tsx
 * import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "./components/navigation/navigation-menu"
 * 
 * function Example() {
 *   return (
 *     <NavigationMenu>
 *       <NavigationMenuList>
 *         <NavigationMenuItem>
 *           <NavigationMenuTrigger>首页</NavigationMenuTrigger>
 *           <NavigationMenuContent>
 *             <div className="grid gap-4 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
 *               <div>
 *                 <h3 className="font-medium">首页内容</h3>
 *                 <p className="text-sm text-gray-500">欢迎访问我们的网站</p>
 *               </div>
 *             </div>
 *           </NavigationMenuContent>
 *         </NavigationMenuItem>
 *         <NavigationMenuItem>
 *           <NavigationMenuTrigger>产品</NavigationMenuTrigger>
 *           <NavigationMenuContent>
 *             <div className="grid gap-4 p-4 md:w-[400px]">
 *               <NavigationMenuLink href="/products">所有产品</NavigationMenuLink>
 *               <NavigationMenuLink href="/products/new">新产品</NavigationMenuLink>
 *               <NavigationMenuLink href="/products/popular">热门产品</NavigationMenuLink>
 *             </div>
 *           </NavigationMenuContent>
 *         </NavigationMenuItem>
 *         <NavigationMenuItem>
 *           <NavigationMenuLink href="/about">关于我们</NavigationMenuLink>
 *         </NavigationMenuItem>
 *       </NavigationMenuList>
 *     </NavigationMenu>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { navigationMenuClassName, navigationMenuContentClassName, navigationMenuIndicatorClassName, navigationMenuIndicatorIconClassName, navigationMenuListClassName, navigationMenuTriggerIconClassName, navigationMenuTriggerStyle, navigationMenuViewportClassName } from "./variants/navigation-menu";

/**
 * 导航菜单根组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Root>>} ref - 组件引用
 * @returns {React.ReactElement} NavigationMenu 组件实例
 */
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      navigationMenuClassName,
      className
    )}
    {...props}
  >
    {children}
    {/* 导航菜单视口 */}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));

// 设置组件显示名称，用于 React DevTools 调试
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

/**
 * 导航菜单列表
 * 
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.List>>} ref - 组件引用
 * @returns {React.ReactElement} NavigationMenuList 组件实例
 */
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      navigationMenuListClassName,
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

/**
 * 导航菜单项
 * 
 * 直接使用 Radix UI 的 NavigationMenuPrimitive.Item 组件
 */
const NavigationMenuItem = NavigationMenuPrimitive.Item;

/**
 * 导航菜单触发器
 * 
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Trigger>>} ref - 组件引用
 * @returns {React.ReactElement} NavigationMenuTrigger 组件实例
 */
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle, "group", className)}
    {...props}
  >
    {children}{" "}
    {/* 下拉箭头图标 */}
    <ChevronDown
      className={navigationMenuTriggerIconClassName}
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));

// 设置组件显示名称，用于 React DevTools 调试
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

/**
 * 导航菜单内容
 * 
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Content>>} ref - 组件引用
 * @returns {React.ReactElement} NavigationMenuContent 组件实例
 */
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      navigationMenuContentClassName,
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

/**
 * 导航菜单链接
 * 
 * 直接使用 Radix UI 的 NavigationMenuPrimitive.Link 组件
 */
const NavigationMenuLink = NavigationMenuPrimitive.Link;

/**
 * 导航菜单视口
 * 
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Viewport>>} ref - 组件引用
 * @returns {React.ReactElement} NavigationMenuViewport 组件实例
 */
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        navigationMenuViewportClassName,
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));

// 设置组件显示名称，用于 React DevTools 调试
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

/**
 * 导航菜单指示器
 * 
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Indicator>>} ref - 组件引用
 * @returns {React.ReactElement} NavigationMenuIndicator 组件实例
 */
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      navigationMenuIndicatorClassName,
      className
    )}
    {...props}
  >
    <div className={navigationMenuIndicatorIconClassName} />
  </NavigationMenuPrimitive.Indicator>
));

// 设置组件显示名称，用于 React DevTools 调试
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
