/**
 * 聊天消息组件国际化配置
 */
import { Locale } from "/@/i18n/locale";
import { Translations } from "./index";

export const chatMessageTranslations: Translations = {
  'ai_states.thinking': {
    [Locale.English]: "Thinking...",
    [Locale.Chinese]: "思考中..."
  },
  'ai_states.generating': {
    [Locale.English]: "Generating response...",
    [Locale.Chinese]: "生成回复中..."
  },
  'ai_states.accessing_sources': {
    [Locale.English]: "Accessing external sources...",
    [Locale.Chinese]: "访问外部资源..."
  },
  'ai_states.error': {
    [Locale.English]: "An error occurred.",
    [Locale.Chinese]: "发生错误。"
  },
  'actions.copy': {
    [Locale.English]: "Copy",
    [Locale.Chinese]: "复制"
  },
  'actions.copied': {
    [Locale.English]: "Copied",
    [Locale.Chinese]: "已复制"
  }
};
