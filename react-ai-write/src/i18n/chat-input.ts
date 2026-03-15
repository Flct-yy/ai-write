import { Locale } from "/@/i18n/locale";
import { Translations } from "/@/i18n/index";

/**
 * 聊天输入组件的国际化配置
 */
export const chatInputTranslations: Translations = {
  'clear_text': {
    [Locale.Chinese]: "清除文本",
    [Locale.English]: "Clear text"
  },
  'stop_generating': {
    [Locale.Chinese]: "停止生成",
    [Locale.English]: "Stop generating"
  },
  'send': {
    [Locale.Chinese]: "发送",
    [Locale.English]: "Send"
  },
};
