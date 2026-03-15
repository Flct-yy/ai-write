/**
 * 骨架屏组件
 * 提供加载状态的骨架屏样式
 */
import * as React from "react";

import { cn } from "/@/utils/classnames";
import { skeletonClassName } from "./variants/skeleton";

/**
 * 骨架屏
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的骨架屏组件
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(skeletonClassName, className)}
      {...props}
    />
  );
}

export { Skeleton };
