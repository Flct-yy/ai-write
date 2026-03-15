/**
 * 侧边栏组件
 * 基于 Radix UI 的 Dialog 组件封装，提供统一的样式和 API
 */
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "/@/utils/classnames";
import {
  sheetOverlayClassName,
  sheetVariants,
  sheetCloseClassName,
  sheetHeaderClassName,
  sheetFooterClassName,
  sheetTitleClassName,
  sheetDescriptionClassName,
  type SheetVariants
} from "./variants/sheet";

/**
 * 侧边栏根容器
 */
const Sheet = SheetPrimitive.Root;

/**
 * 侧边栏触发器
 */
const SheetTrigger = SheetPrimitive.Trigger;

/**
 * 侧边栏关闭按钮
 */
const SheetClose = SheetPrimitive.Close;

/**
 * 侧边栏门户
 */
const SheetPortal = SheetPrimitive.Portal;

/**
 * 侧边栏遮罩层
 * @param {React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>} props - 组件属性
 * @returns {React.ReactElement} 渲染的侧边栏遮罩层组件
 */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(sheetOverlayClassName, className)}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

/**
 * 侧边栏内容属性接口
 */
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  SheetVariants { }

/**
 * 侧边栏内容
 * @param {SheetContentProps} props - 组件属性
 * @returns {React.ReactElement} 渲染的侧边栏内容组件
 */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className={sheetCloseClassName}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

/**
 * 侧边栏头部
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的侧边栏头部组件
 */
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(sheetHeaderClassName, className)}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

/**
 * 侧边栏底部
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的侧边栏底部组件
 */
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(sheetFooterClassName, className)}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

/**
 * 侧边栏标题
 * @param {React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>} props - 组件属性
 * @returns {React.ReactElement} 渲染的侧边栏标题组件
 */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(sheetTitleClassName, className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

/**
 * 侧边栏描述
 * @param {React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>} props - 组件属性
 * @returns {React.ReactElement} 渲染的侧边栏描述组件
 */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn(sheetDescriptionClassName, className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet, SheetClose,
  SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger
};

