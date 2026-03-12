/**
 * InputOTP 组件
 * 
 * 一个基于 input-otp 库的自定义一次性密码输入组件，用于验证用户身份。
 * 
 * @example
 * ```tsx
 * import { useState } from "react"
 * import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./components/inputs/input-otp"
 * 
 * function Example() {
 *   const [otp, setOtp] = useState("")
 *   
 *   return (
 *     <div>
 *       <div style={{ marginTop: "20px" }}>
 *         <InputOTP
 *           maxLength={6}
 *           value={otp}
 *           onChange={(value) => setOtp(value)}
 *         >
 *           <InputOTPGroup>
 *             <InputOTPSlot index={0} />
 *             <InputOTPSlot index={1} />
 *             <InputOTPSlot index={2} />
 *             
 *             <InputOTPSeparator />
 *             
 *             <InputOTPSlot index={3} />
 *             <InputOTPSlot index={4} />
 *             <InputOTPSlot index={5} />
 *           </InputOTPGroup>
 *         </InputOTP>
 *       </div>
 *       
 *       <div style={{ marginTop: "20px" }}>
 *         已输入: {otp || "请输入验证码"}
 *       </div>
 *     </div>
 *   )
 * }
 * ```
 */
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { inputOTPContainerVariant, inputOTPGroupVariant, inputOTPSeparatorVariant, inputOTPSlotActiveVariant, inputOTPSlotCaretVariant, inputOTPSlotVariant, inputOTPVariant } from "./variants/input-otp";

/**
 * InputOTP 主组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof OTPInput>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof OTPInput>>} ref - 组件引用
 * @returns {React.ReactElement} InputOTP 组件实例
 */
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      inputOTPContainerVariant,
      containerClassName
    )}
    className={cn(inputOTPVariant, className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
InputOTP.displayName = "InputOTP";

/**
 * InputOTPGroup 组件
 * 
 * @param {React.ComponentPropsWithoutRef<"div">} props - 组件属性
 * @param {React.Ref<React.ElementRef<"div">>} ref - 组件引用
 * @returns {React.ReactElement} InputOTPGroup 组件实例
 */
const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(inputOTPGroupVariant, className)} {...props} />
));

// 设置组件显示名称，用于 React DevTools 调试
InputOTPGroup.displayName = "InputOTPGroup";

/**
 * InputOTPSlot 组件
 * 
 * @param {React.ComponentPropsWithoutRef<"div"> & { index: number }} props - 组件属性
 * @param {React.Ref<React.ElementRef<"div">>} ref - 组件引用
 * @returns {React.ReactElement} InputOTPSlot 组件实例
 */
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  // 获取 OTPInput 上下文
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        inputOTPSlotVariant,
        isActive && inputOTPSlotActiveVariant,
        className
      )}
      {...props}
    >
      {/* 显示输入的字符 */}
      {char}
      {/* 显示假光标 */}
      {hasFakeCaret && (
        <div className={inputOTPSlotCaretVariant}>
          <div className={inputOTPSeparatorVariant} />
        </div>
      )}
    </div>
  )
});

// 设置组件显示名称，用于 React DevTools 调试
InputOTPSlot.displayName = "InputOTPSlot";

/**
 * InputOTPSeparator 组件
 * 
 * @param {React.ComponentPropsWithoutRef<"div">} props - 组件属性
 * @param {React.Ref<React.ElementRef<"div">>} ref - 组件引用
 * @returns {React.ReactElement} InputOTPSeparator 组件实例
 */
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));

// 设置组件显示名称，用于 React DevTools 调试
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
