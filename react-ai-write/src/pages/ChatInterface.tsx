/**
 * 聊天界面组件
 * 提供聊天功能，包括消息列表、输入区域和AI助手控制
 */

import { useAIAgentStatus } from "/@/hooks/use-ai-agent-status";
import {
  Bot,
  Briefcase,
  FileText,
  Lightbulb,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import {
  useChatContext,
} from "stream-chat-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/@/components/navigation/tabs";
import { useLocale } from "/@/hooks/use-locale";
import { SidebarTrigger } from "/@/components/layout/sidebar";
import { ChatInput, ChatInputProps } from "./ChatInput";

/**
 * 聊天界面组件属性
 */
interface ChatInterfaceProps {
  /** 切换侧边栏的回调函数 */
  onToggleSidebar: () => void;
  /** 发送新聊天消息的回调函数 */
  onNewChatMessage: (message: { text: string }) => Promise<void>;
  /** 后端API地址 */
  backendUrl: string;
}

/**
 * 空状态输入组件
 * 当没有活动频道时显示，提供写作提示和输入区域
 */
const EmptyStateWithInput: React.FC<{
  onNewChatMessage: ChatInputProps["sendMessage"];
}> = ({ onNewChatMessage }) => {
  const [inputText, setInputText] = useState("");
  const { t } = useLocale();

  // 按类别组织的写作提示
  const writingCategories = [
    {
      id: "business",
      icon: <Briefcase className="h-4 w-4" />,
      title: t('business'),
      prompts: [
        t('write_professional_email'),
        t('draft_linkedin_post'),
        t('create_executive_summary'),
        t('write_persuasive_proposal'),
      ],
    },
    {
      id: "content",
      icon: <FileText className="h-4 w-4" />,
      title: t('content'),
      prompts: [
        t('write_blog_post'),
        t('create_social_media_captions'),
        t('draft_newsletter'),
        t('write_product_descriptions'),
      ],
    },
    {
      id: "communication",
      icon: <MessageSquare className="h-4 w-4" />,
      title: t('communication'),
      prompts: [
        t('rewrite_clear_concise'),
        t('improve_professional_tone'),
        t('create_presentation_script'),
        t('write_customer_service_responses'),
      ],
    },
    {
      id: "creative",
      icon: <Lightbulb className="h-4 w-4" />,
      title: t('creative'),
      prompts: [
        t('brainstorm_innovative_solutions'),
        t('generate_creative_angles'),
        t('develop_character_backstories'),
        t('create_compelling_headlines'),
      ],
    },
  ];

  /**
   * 处理提示点击
   * @param prompt 选中的提示文本
   */
  const handlePromptClick = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex-1 flex items-center justify-center overflow-y-auto p-6">
        <div className="text-center max-w-3xl w-full">
          {/* AI助手介绍 */}
          <div className="mb-6">
            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-pulse"></div>
              <Bot className="h-8 w-8 text-primary relative z-10" />
              <Sparkles className="h-4 w-4 text-primary/60 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t('your_ai_writing_partner')}
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              {t('from_first_drafts')}
            </p>
          </div>

          {/* 写作提示类别 - 标签界面 */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {t('what_would_you_like_to_write')}
            </h2>

            <Tabs defaultValue="business" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {writingCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {writingCategories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {category.prompts.map((prompt, promptIndex) => (
                      <button
                        key={promptIndex}
                        onClick={() => handlePromptClick(prompt)}
                        className="p-3 text-left text-sm rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 border border-muted/50 hover:border-muted group"
                      >
                        <span className="text-foreground group-hover:text-primary transition-colors">
                          {prompt}
                        </span>
                      </button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>

      {/* 输入区域 */}
      <div className="border-t bg-background/95 backdrop-blur-sm">
        <div className="p-4">
          <ChatInput
            sendMessage={onNewChatMessage}
            placeholder={t('describe_what_you_d_like_to_write')}
            value={inputText}
            onValueChange={setInputText}
            className="!p-4"
            isGenerating={false}
            onStopGenerating={() => { }}
          />
          {/* 输入提示信息 */}
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
            <span>{t('press_enter_to_send')}</span>
            <span>•</span>
            <span>{t('shift_enter_for_new_line')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 聊天界面组件
 * 提供完整的聊天功能，包括消息列表、输入区域和AI助手控制
 */
const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onToggleSidebar,
  onNewChatMessage,
  backendUrl,
}) => {
  const { channel } = useChatContext();
  const { t } = useLocale();
  const agentStatus = useAIAgentStatus({
    channelId: channel?.id ?? null,
    backendUrl,
  });

  return (
    <div className="flex flex-col h-full bg-background">
      {/* 增强的头部 */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-4 border-b bg-background/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <SidebarTrigger onClick={onToggleSidebar} />
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              {channel?.id && agentStatus.status === "connected" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                {channel?.data?.name || t('new_writing_session')}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t('ai_writing_assistant')} • {t('always_improving')}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col min-h-0">
        <EmptyStateWithInput onNewChatMessage={onNewChatMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;