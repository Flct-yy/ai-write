/**
 * AI 代理控制组件国际化配置
 */

import { Locale } from "/@/i18n/locale";
import { Translations } from "./index";

export const aiAgentTranslations: Translations = {
  'status.connected': {
    [Locale.English]: "Connected",
    [Locale.Chinese]: "已连接"
  },
  'status.connecting': {
    [Locale.English]: "Connecting",
    [Locale.Chinese]: "连接中"
  },
  'status.disconnecting': {
    [Locale.English]: "Disconnecting",
    [Locale.Chinese]: "断开中"
  },
  'status.offline': {
    [Locale.English]: "Offline",
    [Locale.Chinese]: "离线"
  },
  'actions.connect': {
    [Locale.English]: "Connect",
    [Locale.Chinese]: "连接"
  },
  'actions.disconnect': {
    [Locale.English]: "Disconnect",
    [Locale.Chinese]: "断开"
  },
  'actions.refresh_status': {
    [Locale.English]: "Refresh status",
    [Locale.Chinese]: "刷新状态"
  },
  'actions.error': {
    [Locale.English]: "Error",
    [Locale.Chinese]: "错误"
  },
  'messages.connected': {
    [Locale.English]: "AI Connected",
    [Locale.Chinese]: "AI已连接"
  },
  'messages.disconnected': {
    [Locale.English]: "AI Disconnected",
    [Locale.Chinese]: "AI已断开"
  },
  'messages.now_active': {
    [Locale.English]: "AI assistant is now active",
    [Locale.Chinese]: "AI助手现在已激活"
  },
  'messages.turned_off': {
    [Locale.English]: "AI assistant has been turned off",
    [Locale.Chinese]: "AI助手已关闭"
  },
  'messages.error': {
    [Locale.English]: "Error",
    [Locale.Chinese]: "错误"
  },
  'messages.failed_toggle': {
    [Locale.English]: "Failed to toggle AI agent",
    [Locale.Chinese]: "切换AI代理失败"
  },
  'messages.status_updated': {
    [Locale.English]: "Status Updated",
    [Locale.Chinese]: "状态已更新"
  },
  'messages.status_refreshed': {
    [Locale.English]: "AI agent status has been refreshed",
    [Locale.Chinese]: "AI代理状态已刷新"
  },
  'messages.agent_started': {
    [Locale.English]: "AI assistant is now active",
    [Locale.Chinese]: "AI助手现在已激活"
  },
  'messages.agent_stopped': {
    [Locale.English]: "AI assistant has been turned off",
    [Locale.Chinese]: "AI助手已关闭"
  },
  'errors.failed_start': {
    [Locale.English]: "Failed to start AI agent",
    [Locale.Chinese]: "启动AI代理失败"
  },
  'errors.network_start': {
    [Locale.English]: "Network error starting AI agent",
    [Locale.Chinese]: "启动AI代理时网络错误"
  },
  'errors.failed_stop': {
    [Locale.English]: "Failed to stop AI agent",
    [Locale.Chinese]: "停止AI代理失败"
  },
  'errors.network_stop': {
    [Locale.English]: "Network error stopping AI agent",
    [Locale.Chinese]: "停止AI代理时网络错误"
  }
};
