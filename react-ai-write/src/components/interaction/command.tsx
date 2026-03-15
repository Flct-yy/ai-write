/**
 * 命令面板组件
 * 基于 cmdk 的 Command 组件封装，提供统一的样式和 API
 */
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { Dialog, DialogContent } from "/@/components/overlays/dialog";
import {
  commandClassName,
  commandDialogContentClassName,
  commandInputWrapperClassName,
  commandInputClassName,
  commandSearchIconClassName,
  commandListClassName,
  commandEmptyClassName,
  commandGroupClassName,
  commandSeparatorClassName,
  commandItemClassName,
  commandShortcutClassName,
  commandDialogCommandClassName
} from "./variants/command";

/**
 * 命令面板根容器
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive>} props - 组件属性
 * @returns {React.ReactElement} 渲染的命令面板根容器组件
 */
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(commandClassName, className)}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

/**
 * 命令面板对话框
 * @param {DialogProps} props - 组件属性
 * @returns {React.ReactElement} 渲染的命令面板对话框组件
 */
const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      {children}
    </Dialog>
  );
};

/**
 * 命令面板输入框
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>} props - 组件属性
 * @returns {React.ReactElement} 渲染的命令面板输入框组件
 */
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className={commandInputWrapperClassName} cmdk-input-wrapper="">
    <Search className={commandSearchIconClassName} />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(commandInputClassName, className)}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

/**
 * 命令面板列表
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>} props - 组件属性
 * @returns {React.ReactElement} 渲染的命令面板列表组件
 */
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(commandListClassName, className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

/**
 * 命令面板空状态
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>} props - 组件属性
 * @returns {React.ReactElement} 渲染的命令面板空状态组件
 */
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={commandEmptyClassName}
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

/**
 * 命令面板组
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>} props - 组件属性
 * @returns {React.ReactElement} 渲染的命令面板组组件
 */
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(commandGroupClassName, className)}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

/**
 * 命令面板分隔符
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>} props - 组件属性
 * @returns {React.ReactElement} 渲染的命令面板分隔符组件
 */
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn(commandSeparatorClassName, className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/**
 * 命令面板项
 * @param {React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>} props - 组件属性
 * @returns {React.ReactElement} 渲染的命令面板项组件
 */
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(commandItemClassName, className)}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

/**
 * 命令面板快捷键
 * @param {React.HTMLAttributes<HTMLSpanElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的命令面板快捷键组件
 */
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(commandShortcutClassName, className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
