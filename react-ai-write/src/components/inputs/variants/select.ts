// 选择器样式
export const selectVariants = "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";
// 选择器滚动按钮样式
export const selectScrollUpButtonVariants = "flex cursor-default items-center justify-center py-1";
// 选择器滚动按钮样式
export const selectScrollDownButtonVariants = "flex cursor-default items-center justify-center py-1";

// 选择器内容样式
export const selectContentVariants = "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";
export const selectPopperOffsetVariants = "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1";

// 选择器内容口样式
export const selectViewportVariants = "p-1";
export const selectViewportOffsetVariants = "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]";

// 选择器标签样式
export const selectLabelVariants = "py-1.5 pl-8 pr-2 text-sm font-semibold";

// 选择器项样式
export const selectItemVariants = "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
export const selectItemIndicatorVariants = "absolute left-2 flex h-3.5 w-3.5 items-center justify-center";

// 选择器分隔符样式
export const selectSeparatorVariants = "-mx-1 my-1 h-px bg-muted";
