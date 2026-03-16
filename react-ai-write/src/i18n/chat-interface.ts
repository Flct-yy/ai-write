/**
 * 聊天界面组件国际化配置
 * 
 * 包含聊天界面中所有需要国际化的文本内容
 */

import { Translations, Locale } from "./index";

export const chatInterfaceTranslations: Translations = {
  // Hero Section - 英雄区域
  // 包含聊天界面的标题、描述和问题
  'hero.title': {
    [Locale.English]: "Your AI Writing Partner",
    [Locale.Chinese]: "您的AI写作伙伴"
  },
  'hero.description': {
    [Locale.English]: "From first drafts to final edits, I'm here to help you write better, faster.",
    [Locale.Chinese]: "从初稿到最终编辑，我在这里帮助您更好、更快地写作。"
  },
  'hero.question': {
    [Locale.English]: "What would you like to write today?",
    [Locale.Chinese]: "今天您想写什么？"
  },

  // Categories - 分类
  'categories.business': {
    [Locale.English]: "Business",
    [Locale.Chinese]: "商务"
  },
  'categories.content': {
    [Locale.English]: "Content",
    [Locale.Chinese]: "内容"
  },
  'categories.communication': {
    [Locale.English]: "Communication",
    [Locale.Chinese]: "沟通"
  },
  'categories.creative': {
    [Locale.English]: "Creative",
    [Locale.Chinese]: "创意"
  },

  // Business Prompts - 商务提示
  'prompts.business.email': {
    [Locale.English]: "Write a professional email to my boss about a project update",
    [Locale.Chinese]: "写一封专业邮件给我的老板，汇报项目进展"
  },
  'prompts.business.linkedin': {
    [Locale.English]: "Draft a compelling LinkedIn post about a recent achievement",
    [Locale.Chinese]: "起草一篇关于最近成就的引人注目的LinkedIn帖子"
  },
  'prompts.business.executive_summary': {
    [Locale.English]: "Create an executive summary for a quarterly business report",
    [Locale.Chinese]: "为季度商业报告创建执行摘要"
  },
  'prompts.business.proposal': {
    [Locale.English]: "Write a persuasive proposal for a new marketing campaign",
    [Locale.Chinese]: "为新的营销活动撰写有说服力的提案"
  },

  // Content Prompts - 内容提示
  'prompts.content.blog': {
    [Locale.English]: "Write a blog post about emerging trends in my industry",
    [Locale.Chinese]: "写一篇关于我所在行业新兴趋势的博客文章"
  },
  'prompts.content.social_media': {
    [Locale.English]: "Create engaging social media captions for a product launch",
    [Locale.Chinese]: "为产品发布创建引人入胜的社交媒体 caption"
  },
  'prompts.content.newsletter': {
    [Locale.English]: "Draft a newsletter that drives customer engagement",
    [Locale.Chinese]: "起草一份提高客户参与度的新闻通讯"
  },
  'prompts.content.product_descriptions': {
    [Locale.English]: "Write compelling product descriptions that convert",
    [Locale.Chinese]: "撰写引人注目的产品描述以提高转化率"
  },

  // Communication Prompts - 沟通提示
  'prompts.communication.rewrite': {
    [Locale.English]: "Rewrite this text to be more clear and concise",
    [Locale.Chinese]: "重写这段文本，使其更加清晰简洁"
  },
  'prompts.communication.tone': {
    [Locale.English]: "Improve the tone of this message to sound more professional",
    [Locale.Chinese]: "改进这条消息的语气，使其听起来更专业"
  },
  'prompts.communication.presentation': {
    [Locale.English]: "Create a presentation script that keeps audiences engaged",
    [Locale.Chinese]: "创建一个保持观众参与的演示脚本"
  },
  'prompts.communication.customer_service': {
    [Locale.English]: "Write customer service responses that build trust",
    [Locale.Chinese]: "撰写建立信任的客户服务回复"
  },

  // Creative Prompts - 创意提示
  'prompts.creative.brainstorm': {
    [Locale.English]: "Brainstorm innovative solutions for a common problem",
    [Locale.Chinese]: "为常见问题集思广益创新解决方案"
  },
  'prompts.creative.angles': {
    [Locale.English]: "Generate creative angles for a story or article",
    [Locale.Chinese]: "为故事或文章生成创意角度"
  },
  'prompts.creative.character': {
    [Locale.English]: "Develop character backstories for creative writing",
    [Locale.Chinese]: "为创意写作开发角色背景故事"
  },
  'prompts.creative.headlines': {
    [Locale.English]: "Create compelling headlines that grab attention",
    [Locale.Chinese]: "创建引人注目的标题以吸引注意力"
  },

  // Input Area - 输入区域
  'input.placeholder': {
    [Locale.English]: "Describe what you'd like to write, or paste text to improve...",
    [Locale.Chinese]: "描述您想写的内容，或粘贴文本进行改进..."
  },
  'input.enter_to_send': {
    [Locale.English]: "Press Enter to send",
    [Locale.Chinese]: "按 Enter 发送"
  },
  'input.shift_enter_newline': {
    [Locale.English]: "Shift + Enter for new line",
    [Locale.Chinese]: "Shift + Enter 换行"
  },

  // Empty State - 空状态
  'empty_state.title': {
    [Locale.English]: "Ready to Write",
    [Locale.Chinese]: "准备好写作"
  },
  'empty_state.description': {
    [Locale.English]: "Start the conversation and let's create something amazing together.",
    [Locale.Chinese]: "开始对话，让我们一起创造一些令人惊叹的东西。"
  },

  // Header - 头部
  'header.new_session': {
    [Locale.English]: "New Writing Session",
    [Locale.Chinese]: "新的写作会话"
  },
  'header.assistant': {
    [Locale.English]: "AI Writing Assistant",
    [Locale.Chinese]: "AI写作助手"
  },
  'header.improving': {
    [Locale.English]: "Always improving",
    [Locale.Chinese]: "不断改进"
  },

  // Delete Session - 删除会话
  'delete_session.title': {
    [Locale.English]: "Delete Writing Session",
    [Locale.Chinese]: "删除写作会话"
  },
  'delete_session.description': {
    [Locale.English]: "Are you sure you want to delete this writing session? This action cannot be undone and all content will be permanently deleted.",
    [Locale.Chinese]: "您确定要删除这个写作会话吗？此操作无法撤销，所有内容将被永久删除。"
  },
  'delete_session.cancel': {
    [Locale.English]: "Cancel",
    [Locale.Chinese]: "取消"
  },
  'delete_session.confirm': {
    [Locale.English]: "Delete Session",
    [Locale.Chinese]: "删除会话"
  }
};
