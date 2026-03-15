import { Locale } from "./locale";
import { loginTranslations } from "./login";

// 支持的语言类型
export { Locale };

// 翻译类型定义
export interface Translations {
  [key: string]: {
    [locale in Locale]: string;
  };
}

// 翻译内容
export const translations: Translations = {
  'chinese': {
    [Locale.Chinese]: '中文',
    [Locale.English]: 'Chinese'
  },
  'english': {
    [Locale.Chinese]: '英文',
    [Locale.English]: 'English'
  },
  ...loginTranslations
};