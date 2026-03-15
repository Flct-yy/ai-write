/**
 * 徽章组件
 * 提供统一的徽章样式和 API
 */
import * as React from "react";

import { cn } from "/@/utils/classnames";
import { badgeVariants, type VariantProps } from "./variants/badge";

/**
 * 徽章属性接口
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

/**
 * 徽章
 * @param {BadgeProps} props - 组件属性
 * @returns {React.ReactElement} 渲染的徽章组件
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
