/**
 * Form 组件
 * 
 * 基于 react-hook-form 和 Radix UI 的表单组件集合，用于构建具有验证功能的表单。
 * 
 * @example
 * ```tsx
 * import { useForm } from "react-hook-form"
 * import {
 *   Form,
 *   FormItem,
 *   FormLabel,
 *   FormControl,
 *   FormDescription,
 *   FormMessage,
 *   FormField
 * } from "./components/inputs/form"
 * import { Input } from "./components/inputs/input"
 * import { Checkbox } from "./components/inputs/checkbox"
 * import { Button } from "./components/inputs/button"
 * 
 * function LoginForm() {
 *   // 初始化表单
 *   const form = useForm({
 *     defaultValues: {
 *       email: "",
 *       password: "",
 *       remember: false
 *     },
 *     mode: "onChange"
 *   })
 * 
 *   // 处理表单提交
 *   const onSubmit = (values) => {
 *     console.log("表单提交:", values)
 *     // 这里添加登录逻辑
 *   }
 * 
 *   return (
 *     <Form {...form}>
 *       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto p-4">
 *         <FormField
 *           control={form.control}
 *           name="email"
 *           rules={{
 *             required: "邮箱不能为空",
 *             pattern: {
 *               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
 *               message: "请输入有效的邮箱地址",
 *             },
 *           }}
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>电子邮箱</FormLabel>
 *               <FormControl>
 *                 <Input
 *                   type="email"
 *                   placeholder="请输入邮箱"
 *                   {...field}
 *                 />
 *               </FormControl>
 *               <FormDescription>
 *                 我们不会分享你的邮箱给第三方
 *               </FormDescription>
 *               <FormMessage />
 *             </FormItem>
 *           )}
 *         />
 * 
 *         <FormField
 *           control={form.control}
 *           name="password"
 *           rules={{
 *             required: "密码不能为空",
 *             minLength: {
 *               value: 6,
 *               message: "密码至少需要6个字符",
 *             },
 *           }}
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>密码</FormLabel>
 *               <FormControl>
 *                 <Input
 *                   type="password"
 *                   placeholder="请输入密码"
 *                   {...field}
 *                 />
 *               </FormControl>
 *               <FormMessage />
 *             </FormItem>
 *           )}
 *         />
 * 
 *         <FormField
 *           control={form.control}
 *           name="remember"
 *           render={({ field }) => (
 *             <FormItem className="flex flex-row items-center space-x-2">
 *               <FormControl>
 *                 <Checkbox
 *                   checked={field.value}
 *                   onCheckedChange={field.onChange}
 *                 />
 *               </FormControl>
 *               <FormLabel className="cursor-pointer">
 *                 记住我
 *               </FormLabel>
 *             </FormItem>
 *           )}
 *         />
 * 
 *         <Button type="submit" className="w-full">
 *           登录
 *         </Button>
 *       </form>
 *     </Form>
 *   )
 * }
 * ```
 */
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "/@/utils/classnames";
import { Label } from "./label";
import { formDescriptionVariants, formLabelVariants, formMessageVariants, formVariants } from "./variants/form";

/**
 * Form 组件，基于 react-hook-form 的 FormProvider
 */
const Form = FormProvider;

/**
 * FormField 上下文值类型
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
};

/**
 * FormField 上下文
 */
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

/**
 * FormField 组件
 * 
 * @param {ControllerProps<TFieldValues, TName>} props - 组件属性
 * @returns {React.ReactElement} FormField 组件实例
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
};

/**
 * 使用表单字段的钩子
 * 
 * @returns {Object} 表单字段相关信息
 */
const useFormField = () => {
  // 获取 FormField 上下文
  const fieldContext = React.useContext(FormFieldContext);
  // 获取 FormItem 上下文
  const itemContext = React.useContext(FormItemContext);
  // 获取表单上下文
  const { getFieldState, formState } = useFormContext();

  // 获取字段状态
  const fieldState = getFieldState(fieldContext.name, formState);

  // 确保在 FormField 内部使用
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
};

/**
 * FormItem 上下文值类型
 */
type FormItemContextValue = {
  id: string
};

/**
 * FormItem 上下文
 */
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

/**
 * FormItem 组件
 * 
 * @param {React.HTMLAttributes<HTMLDivElement>} props - 组件属性
 * @param {React.Ref<HTMLDivElement>} ref - 组件引用
 * @returns {React.ReactElement} FormItem 组件实例
 */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // 生成唯一 ID
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn(formVariants(), className)} {...props} />
    </FormItemContext.Provider>
  )
});

// 设置组件显示名称，用于 React DevTools 调试
FormItem.displayName = "FormItem";

/**
 * FormLabel 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof LabelPrimitive.Root>>} ref - 组件引用
 * @returns {React.ReactElement} FormLabel 组件实例
 */
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  // 获取表单字段信息
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && formLabelVariants(), className)}
      htmlFor={formItemId}
      {...props}
    />
  )
});

// 设置组件显示名称，用于 React DevTools 调试
FormLabel.displayName = "FormLabel";

/**
 * FormControl 组件
 * 
 * @param {React.ComponentPropsWithoutRef<typeof Slot>} props - 组件属性
 * @param {React.Ref<React.ElementRef<typeof Slot>>} ref - 组件引用
 * @returns {React.ReactElement} FormControl 组件实例
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  // 获取表单字段信息
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
});

// 设置组件显示名称，用于 React DevTools 调试
FormControl.displayName = "FormControl";

/**
 * FormDescription 组件
 * 
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - 组件属性
 * @param {React.Ref<HTMLParagraphElement>} ref - 组件引用
 * @returns {React.ReactElement} FormDescription 组件实例
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  // 获取表单字段信息
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(formDescriptionVariants(), className)}
      {...props}
    />
  )
});

// 设置组件显示名称，用于 React DevTools 调试
FormDescription.displayName = "FormDescription";

/**
 * FormMessage 组件
 * 
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - 组件属性
 * @param {React.Ref<HTMLParagraphElement>} ref - 组件引用
 * @returns {React.ReactElement} FormMessage 组件实例
 */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  // 获取表单字段信息
  const { error, formMessageId } = useFormField();
  // 优先显示错误信息，其次显示自定义内容
  const body = error ? String(error?.message) : children;

  // 如果没有内容，不渲染
  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(formMessageVariants(), className)}
      {...props}
    >
      {body}
    </p>
  )
});

// 设置组件显示名称，用于 React DevTools 调试
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
