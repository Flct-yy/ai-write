/**
 * 上下文菜单组件
 * 基于 Radix UI 的 ContextMenu 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "/@/utils/classnames";
import {
  contextMenuSubTriggerClassName,
  contextMenuSubTriggerInsetClassName,
  contextMenuSubContentClassName,
  contextMenuContentClassName,
  contextMenuItemClassName,
  contextMenuItemInsetClassName,
  contextMenuCheckboxItemClassName,
  contextMenuRadioItemClassName,
  contextMenuItemIndicatorClassName,
  contextMenuLabelClassName,
  contextMenuLabelInsetClassName,
  contextMenuSeparatorClassName,
  contextMenuShortcutClassName,
  contextMenuChevronRightIconClassName,
  contextMenuCheckIconClassName,
  contextMenuCircleIconClassName
} from "./variants/context-menu";

/**
 * 上下文菜单根容器
 */
const ContextMenu = ContextMenuPrimitive.Root;

/**
 * 上下文菜单触发器
 */
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

/**
 * 上下文菜单组
 */
const ContextMenuGroup = ContextMenuPrimitive.Group;

/**
 * 上下文菜单门户
 */
const ContextMenuPortal = ContextMenuPrimitive.Portal;

/**
 * 上下文菜单子菜单
 */
const ContextMenuSub = ContextMenuPrimitive.Sub;

/**
 * 上下文菜单单选框组
 */
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

/**
 * 上下文菜单子触发器
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }} props - 组件属性
 * @returns {React.ReactElement} 渲染的上下文菜单子触发器组件
 */
const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      contextMenuSubTriggerClassName,
      inset && contextMenuSubTriggerInsetClassName,
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className={contextMenuChevronRightIconClassName} />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

/**
 * 上下文菜单子内容
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>} props - 组件属性
 * @returns {React.ReactElement} 渲染的上下文菜单子内容组件
 */
const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(contextMenuSubContentClassName, className)}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

/**
 * 上下文菜单内容
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>} props - 组件属性
 * @returns {React.ReactElement} 渲染的上下文菜单内容组件
 */
const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(contextMenuContentClassName, className)}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

/**
 * 上下文菜单项
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean }} props - 组件属性
 * @returns {React.ReactElement} 渲染的上下文菜单项组件
 */
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      contextMenuItemClassName,
      inset && contextMenuItemInsetClassName,
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

/**
 * 上下文菜单复选框项
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>} props - 组件属性
 * @returns {React.ReactElement} 渲染的上下文菜单复选框项组件
 */
const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(contextMenuCheckboxItemClassName, className)}
    checked={checked}
    {...props}
  >
    <span className={contextMenuItemIndicatorClassName}>
      <ContextMenuPrimitive.ItemIndicator>
        <Check className={contextMenuCheckIconClassName} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

/**
 * 上下文菜单单选框项
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>} props - 组件属性
 * @returns {React.ReactElement} 渲染的上下文菜单单选框项组件
 */
const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(contextMenuRadioItemClassName, className)}
    {...props}
  >
    <span className={contextMenuItemIndicatorClassName}>
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className={contextMenuCircleIconClassName} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

/**
 * 上下文菜单标签
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }} props - 组件属性
 * @returns {React.ReactElement} 渲染的上下文菜单标签组件
 */
const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      contextMenuLabelClassName,
      inset && contextMenuLabelInsetClassName,
      className
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

/**
 * 上下文菜单分隔符
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>} props - 组件属性
 * @returns {React.ReactElement} 渲染的上下文菜单分隔符组件
 */
const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn(contextMenuSeparatorClassName, className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

/**
 * 上下文菜单快捷键
 * @param {React.HTMLAttributes<HTMLSpanElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的上下文菜单快捷键组件
 */
const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(contextMenuShortcutClassName, className)}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
