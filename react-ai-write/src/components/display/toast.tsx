/**
 * 提示框组件
 * 基于 Radix UI 的 Toast 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { toastViewportClassName, toastVariants, toastActionClassName, toastCloseClassName, toastTitleClassName, toastDescriptionClassName, type VariantProps } from "./variants/toast";

/**
 * 提示框提供者
 */
const ToastProvider = ToastPrimitives.Provider;

/**
 * 提示框视口
 * @param {React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>} props - 组件属性
 * @returns {React.ReactElement} 渲染的提示框视口组件
 */
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(toastViewportClassName, className)}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/**
 * 提示框
 * @param {React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>} props - 组件属性
 * @returns {React.ReactElement} 渲染的提示框组件
 */
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

/**
 * 提示框操作按钮
 * @param {React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>} props - 组件属性
 * @returns {React.ReactElement} 渲染的提示框操作按钮组件
 */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(toastActionClassName, className)}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * 提示框关闭按钮
 * @param {React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>} props - 组件属性
 * @returns {React.ReactElement} 渲染的提示框关闭按钮组件
 */
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(toastCloseClassName, className)}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

/**
 * 提示框标题
 * @param {React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>} props - 组件属性
 * @returns {React.ReactElement} 渲染的提示框标题组件
 */
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(toastTitleClassName, className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * 提示框描述
 * @param {React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>} props - 组件属性
 * @returns {React.ReactElement} 渲染的提示框描述组件
 */
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn(toastDescriptionClassName, className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

/**
 * 提示框属性类型
 */
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

/**
 * 提示框操作元素类型
 */
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
