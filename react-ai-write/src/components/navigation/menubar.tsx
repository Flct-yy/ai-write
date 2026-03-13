/**
 * Menubar 组件
 * 
 * 一个基于 Radix UI 的菜单栏组件，用于创建带有下拉菜单的导航栏。
 * 
 * @example
 * ```tsx
 * import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut } from "./components/navigation/menubar"
 * 
 * function Example() {
 *   return (
 *     <Menubar>
 *       <MenubarMenu>
 *         <MenubarTrigger>文件</MenubarTrigger>
 *         <MenubarContent>
 *           <MenubarItem>
 *             新建
 *             <MenubarShortcut>Ctrl+N</MenubarShortcut>
 *           </MenubarItem>
 *           <MenubarItem>
 *             打开
 *             <MenubarShortcut>Ctrl+O</MenubarShortcut>
 *           </MenubarItem>
 *           <MenubarSeparator />
 *           <MenubarItem>
 *             保存
 *             <MenubarShortcut>Ctrl+S</MenubarShortcut>
 *           </MenubarItem>
 *         </MenubarContent>
 *       </MenubarMenu>
 *       <MenubarMenu>
 *         <MenubarTrigger>编辑</MenubarTrigger>
 *         <MenubarContent>
 *           <MenubarItem>
 *             剪切
 *             <MenubarShortcut>Ctrl+X</MenubarShortcut>
 *           </MenubarItem>
 *           <MenubarItem>
 *             复制
 *             <MenubarShortcut>Ctrl+C</MenubarShortcut>
 *           </MenubarItem>
 *           <MenubarItem>
 *             粘贴
 *             <MenubarShortcut>Ctrl+V</MenubarShortcut>
 *           </MenubarItem>
 *         </MenubarContent>
 *       </MenubarMenu>
 *     </Menubar>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { ChevronRightClassName, menubarShortcutClassName, menubarSubTriggerClassName, menubarRadioItemIndicatorIconClassName, menubarLabelClassName, menubarSeparatorClassName, menubarItemClassName, menubarCheckboxItemClassName, menubarRadioItemClassName, menubarRadioItemIndicatorClassName, menubarCheckboxItemIndicatorClassName, menubarContentClassName, menubarSubContentClassName, menubarTriggerClassName, menubarClassName, } from "./variants/menubar";

/**
 * 菜单栏菜单
 * 
 * 直接使用 Radix UI 的 MenubarPrimitive.Menu 组件
 */
const MenubarMenu = MenubarPrimitive.Menu;

/**
 * 菜单栏组
 * 
 * 直接使用 Radix UI 的 MenubarPrimitive.Group 组件
 */
const MenubarGroup = MenubarPrimitive.Group;

/**
 * 菜单栏门户
 * 
 * 直接使用 Radix UI 的 MenubarPrimitive.Portal 组件
 */
const MenubarPortal = MenubarPrimitive.Portal;

/**
 * 菜单栏子菜单
 * 
 * 直接使用 Radix UI 的 MenubarPrimitive.Sub 组件
 */
const MenubarSub = MenubarPrimitive.Sub;

/**
 * 菜单栏单选组
 * 
 * 直接使用 Radix UI 的 MenubarPrimitive.RadioGroup 组件
 */
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

/**
 * 菜单栏根组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Root>>} ref - 组件引用
 * @returns {React.ReactElement} Menubar 组件实例
 */
const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      menubarClassName,
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
Menubar.displayName = MenubarPrimitive.Root.displayName;

/**
 * 菜单栏触发器
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Trigger>>} ref - 组件引用
 * @returns {React.ReactElement} MenubarTrigger 组件实例
 */
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      menubarTriggerClassName,
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

/**
 * 菜单栏子触发器
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }} props - 组件属性
 * @param {boolean} props.inset - 是否缩进显示
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.SubTrigger>>} ref - 组件引用
 * @returns {React.ReactElement} MenubarSubTrigger 组件实例
 */
const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      menubarSubTriggerClassName,
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    {/* 右箭头图标 */}
    <ChevronRight className={ChevronRightClassName} />
  </MenubarPrimitive.SubTrigger>
));

// 设置组件显示名称，用于 React DevTools 调试
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

/**
 * 菜单栏子内容
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.SubContent>>} ref - 组件引用
 * @returns {React.ReactElement} MenubarSubContent 组件实例
 */
const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      menubarSubContentClassName,
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

/**
 * 菜单栏内容
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>} props - 组件属性
 * @param {string} props.align - 对齐方式，默认为 "start"
 * @param {number} props.alignOffset - 对齐偏移量，默认为 -4
 * @param {number} props.sideOffset - 侧边偏移量，默认为 8
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Content>>} ref - 组件引用
 * @returns {React.ReactElement} MenubarContent 组件实例
 */
const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          menubarContentClassName,
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
);

// 设置组件显示名称，用于 React DevTools 调试
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

/**
 * 菜单栏项
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { inset?: boolean }} props - 组件属性
 * @param {boolean} props.inset - 是否缩进显示
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Item>>} ref - 组件引用
 * @returns {React.ReactElement} MenubarItem 组件实例
 */
const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      menubarItemClassName,
      inset && "pl-8",
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

/**
 * 菜单栏复选框项
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>} props - 组件属性
 * @param {boolean} props.checked - 是否选中
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.CheckboxItem>>} ref - 组件引用
 * @returns {React.ReactElement} MenubarCheckboxItem 组件实例
 */
const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      menubarCheckboxItemClassName,
      className
    )}
    checked={checked}
    {...props}
  >
    {/* 复选框指示器 */}
    <span className={menubarCheckboxItemIndicatorClassName}>
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));

// 设置组件显示名称，用于 React DevTools 调试
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

/**
 * 菜单栏单选框项
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.RadioItem>>} ref - 组件引用
 * @returns {React.ReactElement} MenubarRadioItem 组件实例
 */
const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      menubarRadioItemClassName,
      className
    )}
    {...props}
  >
    {/* 单选框指示器 */}
    <span className={menubarRadioItemIndicatorClassName}>
      <MenubarPrimitive.ItemIndicator>
        <Circle className={menubarRadioItemIndicatorIconClassName} />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));

// 设置组件显示名称，用于 React DevTools 调试
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

/**
 * 菜单栏标签
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }} props - 组件属性
 * @param {boolean} props.inset - 是否缩进显示
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Label>>} ref - 组件引用
 * @returns {React.ReactElement} MenubarLabel 组件实例
 */
const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      menubarLabelClassName,
      inset && "pl-8",
      className
    )}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

/**
 * 菜单栏分隔线
 * 
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Separator>>} ref - 组件引用
 * @returns {React.ReactElement} MenubarSeparator 组件实例
 */
const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn(menubarSeparatorClassName, className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

/**
 * 菜单栏快捷键
 * 
 * @param {React.HTMLAttributes<HTMLSpanElement>} props - 组件属性
 * @returns {React.ReactElement} MenubarShortcut 组件实例
 */
const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        menubarShortcutClassName,
        className
      )}
      {...props}
    />
  )
};

// 设置组件显示名称，用于 React DevTools 调试
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
