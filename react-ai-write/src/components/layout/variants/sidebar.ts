/**
 * 侧边栏菜单按钮变体
 * 
 * 定义侧边栏菜单按钮的样式变体，包括不同的样式和尺寸选项
 */

import { cva, type VariantProps } from "class-variance-authority";

/**
 * 侧边栏菜单按钮的样式变体
 * 
 * @param variant - 按钮样式变体：
 *   - default: 默认样式，悬停时显示背景色
 *   - outline: 带边框的样式
 * @param size - 按钮尺寸：
 *   - default: 默认尺寸 (h-8 text-sm)
 *   - sm: 小尺寸 (h-7 text-xs)
 *   - lg: 大尺寸 (h-12 text-sm)
 */
export const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * 侧边栏菜单按钮变体的类型
 * 
 * 基于 sidebarMenuButtonVariants 生成的类型，用于类型检查和智能提示
 */
export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;
