import Login from "@/components/login";
import { useContext, useState } from "react";
import { ThemeProviderContext } from "@/contexts/theme-context";

function App() {
  const { theme, setTheme } = useContext(ThemeProviderContext);
  console.log(theme, window.document.documentElement.classList);
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
