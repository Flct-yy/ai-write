import { cva, type VariantProps } from "class-variance-authority";

// 警告框变体
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// 警告框标题
const alertTitleClassName = "mb-1 font-medium leading-none tracking-tight";

// 警告框描述
const alertDescriptionClassName = "text-sm [&_p]:leading-relaxed";

export { alertVariants, alertTitleClassName, alertDescriptionClassName };
export type { VariantProps };