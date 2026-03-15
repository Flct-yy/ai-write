/**
 * 登录页面组件
 * 
 * 允许用户输入用户名并登录到AI助手应用
 */

// 导入SHA-256哈希函数，用于生成用户ID
import { sha256 } from "js-sha256";
// 导入React和useState钩子
import React, { useEffect } from "react";
// 导入useForm钩子
import { useForm } from "react-hook-form";
// 导入User类型
import { User } from "stream-chat";
// 导入组件
import { Button } from "/@/components/inputs/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "/@/components/layout/card";
import { Input } from "/@/components/inputs/input";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "/@/components/inputs/form";
import { Bot, MessageSquare, Brain, Zap } from "lucide-react";
// 导入语言钩子
import { useLocale } from "/@/hooks/use-locale";
import { Locale } from '/@/i18n/index';
// 导入主题钩子
import { useTheme } from "/@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
// 导入布局组件
import { SplitLayout } from "/@/components/layout/layout";

/**
 * 登录组件属性接口
 */
interface LoginProps {
  /**
   * 用户登录成功后的回调函数
   * @param authenticatedUser 认证后的用户信息
   */
  onLogin: (authenticatedUser: User) => void;
}

/**
 * 从用户名创建确定性用户ID的函数
 * @param username 用户名
 * @returns 基于用户名生成的唯一用户ID
 */
const createUserIdFromUsername = (username: string): string => {
  // 使用SHA-256哈希生成安全、确定性的ID
  const hash = sha256(username.toLowerCase().trim());

  // 取前12个字符并添加前缀以提高可读性
  return `user_${hash.substring(0, 12)}`;
};

/**
 * 登录表单数据类型
 */
interface LoginFormData {
  username: string;
}

/**
 * 登录组件
 */
const Login = ({ onLogin }: LoginProps) => {
  // 语言状态管理
  const { locale, setLocale, t } = useLocale();
  // 主题状态管理
  const { theme, setTheme } = useTheme();
  
  // 初始化表单
  const form = useForm<LoginFormData>({
    defaultValues: {
      username: "",
    },
    mode: "onChange",
  });
  
  // 当语言变化时，重新验证表单
  useEffect(() => {
    form.trigger();
  }, [locale, form]);
  
  /**
   * 切换主题
   */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /**
   * 处理表单提交
   * @param values 表单数据
   */
  const handleSubmit = (values: LoginFormData) => {
    // 创建用户对象
    const user = {
      // 生成用户ID
      id: createUserIdFromUsername(values.username.trim().toLowerCase()),
      // 使用原始用户名
      name: values.username.trim(),
    };
    // 调用登录回调
    onLogin(user);
  };

  return (
    <SplitLayout
      left={
        <div className="hidden md:flex w-full bg-gradient-to-br from-primary to-primary/80 text-white flex-col justify-center p-12">
          <div className="space-y-8">
            {/* 品牌标志 */}
            <div className="flex items-center space-x-3">
              <Bot className="h-10 w-10" />
              <h1 className="text-3xl font-bold">{t('ai_assistant')}</h1>
            </div>
            
            {/* 品牌描述 */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{t('welcome')}</h2>
              <p className="text-white/80">{t('enter_username')}</p>
            </div>
            
            {/* 功能图标 */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <MessageSquare className="h-8 w-8" />
                <span className="text-sm">{t('start_chatting')}</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Brain className="h-8 w-8" />
                <span className="text-sm">{t('smart_assistant')}</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Zap className="h-8 w-8" />
                <span className="text-sm">{t('fast_response')}</span>
              </div>
            </div>
          </div>
        </div>
      }
      right={
        <div className="flex w-full items-center justify-center p-8 bg-background">
          <div className="w-full max-w-md">
            {/* 语言和主题切换 */}
            <div className="flex justify-end mb-6 space-x-2">
              {/* 语言切换 */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLocale(locale === Locale.Chinese ? Locale.English : Locale.Chinese)}
              >
                {locale === Locale.Chinese ? 'En' : '中'}
              </Button>
              {/* 主题切换 */}
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* 登录卡片 */}
            <Card className="shadow-lg">
              {/* 卡片头部 */}
              <CardHeader className="text-center space-y-2">
                {/* 机器人图标 */}
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto">
                  <Bot className="h-6 w-6 text-primary-foreground" />
                </div>
                {/* 标题 */}
                <CardTitle className="text-xl font-semibold">
                  {t('welcome')}
                </CardTitle>
                {/* 描述 */}
                <CardDescription className="text-sm text-muted-foreground">
                  {t('enter_username')}
                </CardDescription>
              </CardHeader>
              
              {/* 卡片内容 */}
              <CardContent>
                {/* 登录表单 */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="username"
                      rules={{
                        required: t('username_required'),
                        minLength: {
                          value: 1,
                          message: t('username_required'),
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('username')}</FormLabel>
                          <FormControl>
                            <Input
                              id="username"
                              placeholder={t('enter_name')}
                              {...field}
                              className="h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
              
              {/* 卡片底部 */}
              <CardFooter>
                {/* 登录按钮 */}
                <Button
                  type="submit"
                  className="w-full h-10"
                  disabled={!form.formState.isValid}
                >
                  {t('start_chatting')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      }
    />
  );
};

export default Login;
