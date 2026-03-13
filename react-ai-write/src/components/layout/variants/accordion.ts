// 手风琴项
export const accordionItemVariants = "border-b";
// 手风琴触发器
export const accordionTriggerVariants = "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180";
// 手风琴触发器图标
export const accordionTriggerIconVariants = "h-4 w-4 shrink-0 transition-transform duration-200";
// 手风琴内容
export const accordionContentVariants = "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down";