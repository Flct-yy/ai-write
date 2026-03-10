import Login from "/@/pages/login";
import { useTheme } from "/@/hooks/use-theme";

function App() {
  const { theme, setTheme } = useTheme();
  console.log(theme, window.document.documentElement.classList, setTheme);
  return (
    <div className="h-screen bg-background">
      <Login />
      <button style={{ border: "2px solid #000" }} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}

export default App;
