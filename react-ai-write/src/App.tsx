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
    </div>
  );
}

export default App;
