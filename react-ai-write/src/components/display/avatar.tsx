/**
 * 头像组件
 * 基于 Radix UI 的 Avatar 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "/@/utils/classnames";
import { avatarRootClassName, avatarImageClassName, avatarFallbackClassName } from "./variants/avatar";

/**
 * 头像根容器
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>} props - 组件属性
 * @returns {React.ReactElement} 渲染的头像根容器组件
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarRootClassName, className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * 头像图片
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>} props - 组件属性
 * @returns {React.ReactElement} 渲染的头像图片组件
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(avatarImageClassName, className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/**
 * 头像回退
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>} props - 组件属性
 * @returns {React.ReactElement} 渲染的头像回退组件
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(avatarFallbackClassName, className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
