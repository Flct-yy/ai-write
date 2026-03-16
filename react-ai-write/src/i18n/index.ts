import { Locale } from "./locale";
import { loginTranslations } from "./login";
import { loadingScreenTranslations } from "./loading-screen";
import { chatSidebarTranslations } from "./chat-sidebar";
import { chatInterfaceTranslations } from "./chat-interface";
import { chatInputTranslations } from "./chat-input";
import { writingPromptsToolbarTranslations } from "./writing-prompts-toolbar";
import { chatMessageTranslations } from "./chat-message";
import { aiAgentTranslations } from "./ai-agent";

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
  ...loginTranslations,
  ...loadingScreenTranslations,
  ...chatSidebarTranslations,
  ...chatInterfaceTranslations,
  ...chatInputTranslations,
  ...writingPromptsToolbarTranslations,
  ...chatMessageTranslations,
  ...aiAgentTranslations
};