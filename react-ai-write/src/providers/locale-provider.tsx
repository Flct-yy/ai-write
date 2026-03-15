import { Locale, translations } from "/@/i18n/index";
import { ReactNode, useState } from "react";
import { LocaleContext } from "/@/contexts/locale-context";

// 上下文提供者组件属性
export interface LocaleProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

/**
 * 语言上下文提供者组件
 */
export const LocaleProvider: React.FC<LocaleProviderProps> = (props) => {
  const { children, defaultLocale = Locale.Chinese } = props;
  // 语言状态管理
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  /**
   * 翻译函数
   * @param key 翻译键
   * @returns 翻译后的文本
   */
  const t = (key: string): string => {
    return translations[key]?.[locale] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};