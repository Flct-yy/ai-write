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

function App() {
  const { theme, setTheme } = useTheme();
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
    </div>
  );
}

export default App;
