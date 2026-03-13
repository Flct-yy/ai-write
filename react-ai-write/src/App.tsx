import Login from "/@/pages/login";
import { Button } from "/@/components/inputs/button";
import { Input } from "/@/components/inputs/input";
import { Textarea } from "/@/components/inputs/textarea";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from "/@/components/inputs/select";
import { Checkbox } from "/@/components/inputs/checkbox";
import { useTheme } from "/@/hooks/use-theme";
import { RadioGroup, RadioGroupItem } from "/@/components/inputs/radio-group";
import { Switch } from "/@/components/inputs/switch";
import { Slider } from "/@/components/inputs/slider";
import React, { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./components/inputs/input-otp";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./components/inputs/form";
import { Label } from "./components/inputs/label";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./components/layout/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/layout/accordion";



function App() {
  const { theme, setTheme } = useTheme();
  const [sliderValue, setSliderValue] = useState([50]);

  // 存储用户输入的OTP验证码
  const [otp, setOtp] = useState("");

  // 处理OTP输入变化
  const handleOTPChange = (value: string) => {
    setOtp(value);
    // 可以在这里添加实时验证逻辑，比如输入6位后自动提交
    if (value.length === 6) {
      console.log("OTP输入完成:", value);
      // 调用验证接口等逻辑
    }
  };

  // 初始化表单
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false
    },
    mode: "onChange"
  })

  // 处理表单提交
  const onSubmit = (values) => {
    console.log("表单提交:", values)
    // 这里添加登录逻辑
  }
  return (
    <div className="h-screen bg-background">
      <Login />
      <Button variant="default" className="border border-current" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "Light" : "Dark"}
      </Button>
      <br />
      <Input placeholder="请输入" />
      <br />
      <Textarea placeholder="请输入" />
      <br />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <br />
      <Checkbox id="terms" />
      <label htmlFor="terms">我同意服务条款</label>
      <br />
      <RadioGroup>
        <RadioGroupItem value="apple">Apple</RadioGroupItem>
        <RadioGroupItem value="banana">Banana</RadioGroupItem>
        <RadioGroupItem value="orange">Orange</RadioGroupItem>
      </RadioGroup>
      <br />
      <Switch id="notifications" />
      <label className="ml-2" htmlFor="notifications">启用通知</label>
      <br />
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        onValueChange={setSliderValue}
      />
      <p>当前值: {sliderValue[0]}</p>
      <br />
      {/* 基础使用 */}
      <InputOTP
        value={otp}
        onChange={(value) => setOtp(value)}
        maxLength={6}
      >
        {/* 自定义分组和插槽 */}
        <InputOTPGroup>
          {/* 前3位 */}
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />

          {/* 自定义分隔符 */}
          <InputOTPSeparator />

          {/* 后3位 */}
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      {/* 显示输入结果 */}
      <div style={{ marginTop: "20px" }}>
        已输入: {otp || "请输入验证码"}
      </div>

      <br />
      <Label htmlFor="name"> 用户名:</Label>
      <Input id="name" placeholder="请输入用户名" />

      <br />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto p-4">
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "邮箱不能为空",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "请输入有效的邮箱地址",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>电子邮箱</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="请输入邮箱"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  我们不会分享你的邮箱给第三方
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "密码不能为空",
              minLength: {
                value: 6,
                message: "密码至少需要6个字符",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="请输入密码"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">
                  记住我
                </FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            登录
          </Button>
        </form>
      </Form>
      <br />
      <Card>
        <CardHeader>
          <CardTitle>登录</CardTitle>
        </CardHeader>
        <CardContent>
          <p>登录后即可访问所有功能</p>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            登录
          </Button>
        </CardFooter>
      </Card>
      <br />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>项目 1</AccordionTrigger>
          <AccordionContent>
            项目 1 的内容...
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>项目 2</AccordionTrigger>
          <AccordionContent>
            项目 2 的内容...
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div >
  );
}

export default App;
