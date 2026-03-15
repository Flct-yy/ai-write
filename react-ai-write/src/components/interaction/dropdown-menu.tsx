/**
 * 下拉菜单组件
 * 基于 Radix UI 的 DropdownMenu 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "/@/utils/classnames";
import {
  dropdownMenuSubTriggerClassName,
  dropdownMenuSubTriggerInsetClassName,
  dropdownMenuSubContentClassName,
  dropdownMenuContentClassName,
  dropdownMenuItemClassName,
  dropdownMenuItemInsetClassName,
  dropdownMenuCheckboxItemClassName,
  dropdownMenuRadioItemClassName,
  dropdownMenuItemIndicatorClassName,
  dropdownMenuLabelClassName,
  dropdownMenuLabelInsetClassName,
  dropdownMenuSeparatorClassName,
  dropdownMenuShortcutClassName,
  dropdownMenuChevronRightIconClassName,
  dropdownMenuCheckIconClassName,
  dropdownMenuCircleIconClassName
} from "./variants/dropdown-menu";

/**
 * 下拉菜单根容器
 */
const DropdownMenu = DropdownMenuPrimitive.Root;

/**
 * 下拉菜单触发器
 */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * 下拉菜单组
 */
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * 下拉菜单门户
 */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/**
 * 下拉菜单子菜单
 */
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * 下拉菜单单选框组
 */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * 下拉菜单子触发器
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }} props - 组件属性
 * @returns {React.ReactElement} 渲染的下拉菜单子触发器组件
 */
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      dropdownMenuSubTriggerClassName,
      inset && dropdownMenuSubTriggerInsetClassName,
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className={dropdownMenuChevronRightIconClassName} />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

/**
 * 下拉菜单子内容
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>} props - 组件属性
 * @returns {React.ReactElement} 渲染的下拉菜单子内容组件
 */
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(dropdownMenuSubContentClassName, className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

/**
 * 下拉菜单内容
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>} props - 组件属性
 * @returns {React.ReactElement} 渲染的下拉菜单内容组件
 */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(dropdownMenuContentClassName, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * 下拉菜单项
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }} props - 组件属性
 * @returns {React.ReactElement} 渲染的下拉菜单项组件
 */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      dropdownMenuItemClassName,
      inset && dropdownMenuItemInsetClassName,
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/**
 * 下拉菜单复选框项
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>} props - 组件属性
 * @returns {React.ReactElement} 渲染的下拉菜单复选框项组件
 */
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(dropdownMenuCheckboxItemClassName, className)}
    checked={checked}
    {...props}
  >
    <span className={dropdownMenuItemIndicatorClassName}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className={dropdownMenuCheckIconClassName} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

/**
 * 下拉菜单单选框项
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>} props - 组件属性
 * @returns {React.ReactElement} 渲染的下拉菜单单选框项组件
 */
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(dropdownMenuRadioItemClassName, className)}
    {...props}
  >
    <span className={dropdownMenuItemIndicatorClassName}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className={dropdownMenuCircleIconClassName} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

/**
 * 下拉菜单标签
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }} props - 组件属性
 * @returns {React.ReactElement} 渲染的下拉菜单标签组件
 */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      dropdownMenuLabelClassName,
      inset && dropdownMenuLabelInsetClassName,
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/**
 * 下拉菜单分隔符
 * @param {React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>} props - 组件属性
 * @returns {React.ReactElement} 渲染的下拉菜单分隔符组件
 */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(dropdownMenuSeparatorClassName, className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/**
 * 下拉菜单快捷键
 * @param {React.HTMLAttributes<HTMLSpanElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的下拉菜单快捷键组件
 */
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(dropdownMenuShortcutClassName, className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
