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
import { ScrollArea, ScrollBar } from "/@/components/layout/scroll-area";
import { Separator } from "/@/components/layout/separator";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/layout/resizable";
import { AspectRatio } from "./components/layout/aspect-ratio";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./components/navigation/breadcrumb";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "./components/navigation/navigation-menu";



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

      <br />
      <ScrollArea className="h-48 w-48 border">
        <div className="p-4">
          <p>滚动区域内容...</p>
          <p>更多内容...</p>
          <p>更多内容...</p>
          <p>更多内容...</p>
          <p>更多内容...</p>
          <p>更多内容...</p>
          <p>更多内容...</p>
          <p>更多内容...</p>
          {/* 添加一个很长的行，超出水平宽度 */}
          <p className="whitespace-nowrap">这是一个很长的文本，用于测试水平滚动条，这是一个很长的文本，用于测试水平滚动条</p>
        </div>
      </ScrollArea>
      <Separator className="my-4 border-b" />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <div className="p-4 bg-gray-100 h-full">左侧面板</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <div className="p-4 bg-gray-200 h-full">中间面板</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <div className="p-4 bg-gray-300 h-full">右侧面板</div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <AspectRatio ratio={16 / 9} className="bg-gray-200 h-full">
        <img src="https://picsum.photos/1000/750" alt="示例图片" className="object-cover w-full h-full" />
      </AspectRatio>

      <Separator className="my-4 border-b" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">首页</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">产品</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>详情页</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>首页</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-4 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <div>
                  <h3 className="font-medium">首页内容</h3>
                  <p className="text-sm text-gray-500">欢迎访问我们的网站</p>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>产品</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-4 p-4 md:w-[400px]">
                <NavigationMenuLink href="/products">所有产品</NavigationMenuLink>
                <NavigationMenuLink href="/products/new">新产品</NavigationMenuLink>
                <NavigationMenuLink href="/products/popular">热门产品</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">关于我们</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div >
  );
}

export default App;
