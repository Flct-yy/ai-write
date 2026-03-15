/**
 * 警告对话框组件
 * 基于 Radix UI 的 AlertDialog 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "/@/utils/classnames";
import { buttonVariants } from "/@/components/inputs/variants/button";
import {
  alertDialogOverlayClassName,
  alertDialogContentClassName,
  alertDialogHeaderClassName,
  alertDialogFooterClassName,
  alertDialogTitleClassName,
  alertDialogDescriptionClassName,
  alertDialogActionClassName,
  alertDialogCancelClassName
} from "./variants/alert-dialog";

/**
 * 警告对话框根容器
 */
const AlertDialog = AlertDialogPrimitive.Root;

/**
 * 警告对话框触发器
 */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

/**
 * 警告对话框门户
 */
const AlertDialogPortal = AlertDialogPrimitive.Portal;

/**
 * 警告对话框遮罩层
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告对话框遮罩层组件
 */
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(alertDialogOverlayClassName, className)}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

/**
 * 警告对话框内容
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告对话框内容组件
 */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(alertDialogContentClassName, className)}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

/**
 * 警告对话框头部
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告对话框头部组件
 */
const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(alertDialogHeaderClassName, className)}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

/**
 * 警告对话框底部
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告对话框底部组件
 */
const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(alertDialogFooterClassName, className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

/**
 * 警告对话框标题
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告对话框标题组件
 */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(alertDialogTitleClassName, className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

/**
 * 警告对话框描述
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告对话框描述组件
 */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(alertDialogDescriptionClassName, className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

/**
 * 警告对话框操作按钮
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告对话框操作按钮组件
 */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), alertDialogActionClassName, className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

/**
 * 警告对话框取消按钮
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告对话框取消按钮组件
 */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      alertDialogCancelClassName,
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
