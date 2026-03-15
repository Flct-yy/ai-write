/**
 * 抽屉组件
 * 基于 Vaul 的 Drawer 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "/@/utils/classnames";
import {
  drawerOverlayClassName,
  drawerContentClassName,
  drawerHeaderClassName,
  drawerFooterClassName,
  drawerTitleClassName,
  drawerDescriptionClassName,
  drawerDragHandleClassName
} from "./variants/drawer";

/**
 * 抽屉根容器
 * @param {React.ComponentProps<typeof DrawerPrimitive.Root>} props - 组件属性
 * @returns {React.ReactElement} 渲染的抽屉根容器组件
 */
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

/**
 * 抽屉触发器
 */
const DrawerTrigger = DrawerPrimitive.Trigger;

/**
 * 抽屉门户
 */
const DrawerPortal = DrawerPrimitive.Portal;

/**
 * 抽屉关闭按钮
 */
const DrawerClose = DrawerPrimitive.Close;

/**
 * 抽屉遮罩层
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>} props - 组件属性
 * @returns {React.ReactElement} 渲染的抽屉遮罩层组件
 */
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(drawerOverlayClassName, className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

/**
 * 抽屉内容
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>} props - 组件属性
 * @returns {React.ReactElement} 渲染的抽屉内容组件
 */
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(drawerContentClassName, className)}
      {...props}
    >
      <div className={drawerDragHandleClassName} />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

/**
 * 抽屉头部
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的抽屉头部组件
 */
const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(drawerHeaderClassName, className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

/**
 * 抽屉底部
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的抽屉底部组件
 */
const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(drawerFooterClassName, className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

/**
 * 抽屉标题
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>} props - 组件属性
 * @returns {React.ReactElement} 渲染的抽屉标题组件
 */
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(drawerTitleClassName, className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

/**
 * 抽屉描述
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>} props - 组件属性
 * @returns {React.ReactElement} 渲染的抽屉描述组件
 */
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn(drawerDescriptionClassName, className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
