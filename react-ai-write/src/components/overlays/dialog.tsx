/**
 * 对话框组件
 * 基于 Radix UI 的 Dialog 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "/@/utils/classnames";
import {
  dialogOverlayClassName,
  dialogContentClassName,
  dialogCloseClassName,
  dialogHeaderClassName,
  dialogFooterClassName,
  dialogTitleClassName,
  dialogDescriptionClassName,
  DialogCloseIcon
} from "./variants/dialog";

/**
 * 对话框根容器
 */
const Dialog = DialogPrimitive.Root;

/**
 * 对话框触发器
 */
const DialogTrigger = DialogPrimitive.Trigger;

/**
 * 对话框门户
 */
const DialogPortal = DialogPrimitive.Portal;

/**
 * 对话框关闭按钮
 */
const DialogClose = DialogPrimitive.Close;

/**
 * 对话框遮罩层
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>} props - 组件属性
 * @returns {React.ReactElement} 渲染的对话框遮罩层组件
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(dialogOverlayClassName, className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * 对话框内容
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>} props - 组件属性
 * @returns {React.ReactElement} 渲染的对话框内容组件
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentClassName, className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className={dialogCloseClassName}>
        <DialogCloseIcon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * 对话框头部
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的对话框头部组件
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(dialogHeaderClassName, className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

/**
 * 对话框底部
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的对话框底部组件
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(dialogFooterClassName, className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

/**
 * 对话框标题
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>} props - 组件属性
 * @returns {React.ReactElement} 渲染的对话框标题组件
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(dialogTitleClassName, className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * 对话框描述
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>} props - 组件属性
 * @returns {React.ReactElement} 渲染的对话框描述组件
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(dialogDescriptionClassName, className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
