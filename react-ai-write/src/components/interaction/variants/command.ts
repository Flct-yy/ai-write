// 命令面板根容器
export const commandClassName = "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground";

// 命令面板对话框内容
export const commandDialogContentClassName = "overflow-hidden p-0 shadow-lg";

// 命令面板输入包装器
export const commandInputWrapperClassName = "flex items-center border-b px-3";

// 命令面板输入框
export const commandInputClassName = "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";

// 命令面板搜索图标
export const commandSearchIconClassName = "mr-2 h-4 w-4 shrink-0 opacity-50";

// 命令面板列表
export const commandListClassName = "max-h-[300px] overflow-y-auto overflow-x-hidden";

// 命令面板空状态
export const commandEmptyClassName = "py-6 text-center text-sm";

// 命令面板组
export const commandGroupClassName = "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground";

// 命令面板分隔符
export const commandSeparatorClassName = "-mx-1 h-px bg-border";

// 命令面板项
export const commandItemClassName = "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50";

// 命令面板快捷键
export const commandShortcutClassName = "ml-auto text-xs tracking-widest text-muted-foreground";

// 命令面板对话框内命令面板
export const commandDialogCommandClassName = "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5";