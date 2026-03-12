import { cva } from "class-variance-authority";

// 表单样式
export const formVariants = cva(
  "space-y-2"
);

// 表单标签样式
export const formLabelVariants = cva(
  "text-destructive"
);

// 表单描述样式
export const formDescriptionVariants = cva(
  "text-sm text-muted-foreground"
);

// 表单消息样式
export const formMessageVariants = cva(
  "text-sm font-medium text-destructive"
);