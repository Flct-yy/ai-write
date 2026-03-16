/**
 * 应用主组件
 * 
 * 管理用户认证状态，根据用户是否登录显示不同的组件
 */

import AuthenticatedApp from "/@/pages/AuthenticatedApp";
import Login from "/@/pages/Login";
import { Toaster } from "/@/components/display/toaster";
import { ThemeProvider } from "/@/providers/theme-provider";
import { useState, useEffect } from "react";
import { User } from "stream-chat";

// 存储用户信息的 localStorage 键名
const USER_STORAGE_KEY = "chat-ai-app-user";

/**
 * 应用主组件
 */
function App() {
  // 用户状态管理
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      return null;
    }
  });

  /**
   * 处理用户登录
   * @param authenticatedUser 认证后的用户信息
   */
  const handleUserLogin = (authenticatedUser: User) => {
    try {
      // 为用户生成头像 URL
      const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(authenticatedUser.name || "")}`;
      const userWithImage = {
        ...authenticatedUser,
        image: avatarUrl,
      };
      // 存储用户信息到 localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithImage));
      setUser(userWithImage);
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  };

  /**
   * 处理用户登出
   */
  const handleLogout = () => {
    try {
      // 从 localStorage 移除用户信息
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Error removing user from localStorage:", error);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen bg-background">
        {/* 根据用户状态显示不同的组件 */}
        {user ? (
          <AuthenticatedApp user={user} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleUserLogin} />
        )}

        {/* 消息提示组件 */}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;