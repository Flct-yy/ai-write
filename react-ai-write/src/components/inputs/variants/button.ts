import { cva } from "class-variance-authority";

// 按钮样式 
export const buttonVariants = cva(
  // 基础类名：所有按钮都包含的样式
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  // 变体分类：variant（样式）、size（尺寸）
  {
    variants: {
      variant: {
        // 默认主按钮
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // 危险按钮（删除/取消）
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // 轮廓按钮
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // 次要按钮
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // 幽灵按钮（无背景，hover 才显示）
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // 链接样式按钮
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // 默认尺寸
        default: "h-10 px-4 py-2",
        // 小尺寸
        sm: "h-9 rounded-md px-3",
        // 大尺寸
        lg: "h-11 rounded-md px-8",
        // 仅图标按钮（宽高相等）
        icon: "h-10 w-10",
      },
    },
    // 默认变体：如果用户不指定，使用 default 样式和尺寸
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);