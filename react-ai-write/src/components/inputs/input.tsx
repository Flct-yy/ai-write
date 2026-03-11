/**
 * Input 组件
 * 文本输入框组件，支持标准的 HTML input 属性
 * 
 * @example
 * ```tsx
 * // 基础用法
 * <Input placeholder="请输入内容" />
 * 
 * // 带类型
 * <Input type="email" placeholder="请输入邮箱" />
 * <Input type="password" placeholder="请输入密码" />
 * 
 * // 带自定义类名
 * <Input className="w-full" placeholder="宽输入框" />
 * ```
 */

import * as React from "react"
import { cn } from "/@/utils/classnames"
import { inputVariants } from "./variants/input"

/**
 * 输入框组件
 * @param className 自定义类名
 * @param type 输入框类型
 * @param props 其他输入框属性
 * @param ref 引用
 */
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

/**
 * 导出 Input 组件
 */
export { Input }
