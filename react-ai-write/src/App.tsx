import Login from "/@/pages/login";
import { Button } from "/@/components/inputs/button";
import { Input } from "/@/components/inputs/input";
import { Textarea } from "/@/components/inputs/textarea";
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
    </div>
  );
}

export default App;
