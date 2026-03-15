/**
 * 警告框组件
 * 提供统一的警告框样式和 API
 */
import * as React from "react";

import { cn } from "/@/utils/classnames";
import { alertVariants, alertTitleClassName, alertDescriptionClassName, type VariantProps } from "./variants/alert";

/**
 * 警告框
 * @param {React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告框组件
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

/**
 * 警告框标题
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告框标题组件
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(alertTitleClassName, className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/**
 * 警告框描述
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的警告框描述组件
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(alertDescriptionClassName, className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
