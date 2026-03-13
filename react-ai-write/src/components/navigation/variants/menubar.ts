// 菜单栏根容器
export const menubarClassName = "flex h-10 items-center space-x-1 rounded-md border bg-background p-1";

// 菜单项
export const menubarTriggerClassName = "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground";

// 菜单栏子菜单项触发器
export const menubarSubTriggerClassName = "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground";

export const ChevronRightClassName = "ml-auto h-4 w-4";

// 菜单栏子菜单类
export const menubarSubContentClassName = "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

// 菜单栏内容
export const menubarContentClassName = "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

// 菜单项
export const menubarItemClassName = "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

// 菜单栏子菜单项
export const menubarCheckboxItemClassName = "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

// 菜单栏子菜单项指示器
export const menubarCheckboxItemIndicatorClassName = "absolute left-2 flex h-3.5 w-3.5 items-center justify-center";

// 菜单栏子菜单触发器
export const menubarRadioItemClassName = "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

// 菜单栏子菜单项指示器
export const menubarRadioItemIndicatorClassName = "absolute left-2 flex h-3.5 w-3.5 items-center justify-center";

// 菜单栏子菜单指示器图标
export const menubarRadioItemIndicatorIconClassName = "h-2 w-2 fill-current";

// 菜单栏标签
export const menubarLabelClassName = "px-2 py-1.5 text-sm font-semibold";

// 菜单栏分隔线
export const menubarSeparatorClassName = "-mx-1 my-1 h-px bg-muted";

// 菜单栏快捷键
export const menubarShortcutClassName = "ml-auto text-xs tracking-widest text-muted-foreground";