/**
 * 聊天界面组件
 * 
 * 提供完整的聊天功能，包括消息列表、输入区域和AI代理控制
 * 支持空状态显示、消息列表显示和AI代理状态管理
 */

// 导入AI代理状态钩子
import { useAIAgentStatus } from "/@/hooks/use-ai-agent-status";
// 导入图标
import {
  Bot,          // 机器人图标
  Briefcase,    // 公文包图标
  FileText,     // 文件文本图标
  Lightbulb,    // 灯泡图标
  Menu,         // 菜单图标
  MessageSquare, // 消息广场图标
  Sparkles,     // 火花图标
} from "lucide-react";
// 导入React和相关钩子
import { useRef, useState } from "react";
// 导入Stream Chat相关钩子和组件
import {
  Channel,                  // 频道组件
  MessageList,              // 消息列表组件
  useAIState,               // AI状态钩子
  useChannelActionContext,  // 频道操作上下文
  useChannelStateContext,   // 频道状态上下文
  useChatContext,           // 聊天上下文
  Window,                   // 窗口组件
} from "stream-chat-react";
// 导入侧边栏切换组件
import { SidebarTrigger } from "/@/components/layout/sidebar";
// 导入AI代理控制组件
import { AIAgentControl } from "./AIAgentControl";
// 导入聊天输入组件
import { ChatInput, ChatInputProps } from "./ChatInput";
// 导入聊天消息组件
import ChatMessage from "./ChatMessage";
// 导入标签页组件
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/@/components/navigation/tabs";
// 导入国际化钩子
import { useLocale } from "/@/hooks/use-locale";


/**
 * 聊天界面组件属性接口
 */
interface ChatInterfaceProps {
  /** 切换侧边栏的回调函数 */
  onToggleSidebar: () => void;
  /** 新聊天消息的回调函数 */
  onNewChatMessage: (message: { text: string }) => Promise<void>;
  /** 后端API地址 */
  backendUrl: string;
}

/**
 * 空状态输入组件
 * 
 * 当没有频道时显示的界面，包含英雄区域和写作提示分类
 */
const EmptyStateWithInput: React.FC<{
  /** 发送新消息的回调函数 */
  onNewChatMessage: ChatInputProps["sendMessage"];
}> = ({ onNewChatMessage }) => {
  // 输入文本状态
  const [inputText, setInputText] = useState("");
  // 国际化翻译函数
  const { t } = useLocale();

  const writingCategories = [
    {
      id: "business",
      icon: <Briefcase className="h-4 w-4" />,
      title: t('categories.business'),
      prompts: [
        t('prompts.business.email'),
        t('prompts.business.linkedin'),
        t('prompts.business.executive_summary'),
        t('prompts.business.proposal'),
      ],
    },
    {
      id: "content",
      icon: <FileText className="h-4 w-4" />,
      title: t('categories.content'),
      prompts: [
        t('prompts.content.blog'),
        t('prompts.content.social_media'),
        t('prompts.content.newsletter'),
        t('prompts.content.product_descriptions'),
      ],
    },
    {
      id: "communication",
      icon: <MessageSquare className="h-4 w-4" />,
      title: t('categories.communication'),
      prompts: [
        t('prompts.communication.rewrite'),
        t('prompts.communication.tone'),
        t('prompts.communication.presentation'),
        t('prompts.communication.customer_service'),
      ],
    },
    {
      id: "creative",
      icon: <Lightbulb className="h-4 w-4" />,
      title: t('categories.creative'),
      prompts: [
        t('prompts.creative.brainstorm'),
        t('prompts.creative.angles'),
        t('prompts.creative.character'),
        t('prompts.creative.headlines'),
      ],
    },
  ];

  /**
   * 处理提示点击事件
   * @param prompt 提示文本
   */
  const handlePromptClick = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex-1 flex items-center justify-center overflow-y-auto p-6">
        <div className="text-center max-w-3xl w-full">
          <div className="mb-6">
            <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-pulse"></div>
              <Bot className="h-8 w-8 text-primary relative z-10" />
              <Sparkles className="h-4 w-4 text-primary/60 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t('hero.title')}
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              {t('hero.description')}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {t('hero.question')}
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

      {/* Input */}
      <div className="border-t bg-background/95 backdrop-blur-sm">
        <div className="p-4">
          <ChatInput
            sendMessage={onNewChatMessage}
            placeholder={t('input.placeholder')}
            value={inputText}
            onValueChange={setInputText}
            className="!p-4"
            isGenerating={false}
            showPromptToolbar={true}
            onStopGenerating={() => { }}
          />
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
            <span>{t('input.enter_to_send')}</span>
            <span>•</span>
            <span>{t('input.shift_enter_newline')}</span>
          </div>
        </div>
      </div>
    </div >
  );
};

/**
 * 消息列表空状态指示器
 * 
 * 当消息列表为空时显示的界面
 */
const MessageListEmptyIndicator = () => {
  // 国际化翻译函数
  const { t } = useLocale();
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center px-4">
        <div className="relative inline-flex items-center justify-center w-12 h-12 mb-4">
          <div className="absolute inset-0 bg-primary/10 rounded-xl"></div>
          <Bot className="h-6 w-6 text-primary/80 relative z-10" />
        </div>
        <h2 className="text-lg font-medium text-foreground mb-2">
          {t('empty_state.title')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('empty_state.description')}
        </p>
      </div>
    </div>
  );
};

/**
 * 消息列表内容组件
 * 
 * 显示消息列表或空状态指示器
 */
const MessageListContent = () => {
  // 从上下文获取消息和线程
  const { messages, thread } = useChannelStateContext();
  // 判断是否为线程
  const isThread = !!thread;

  // 如果是线程，不显示内容
  if (isThread) return null;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* 根据消息是否存在显示不同内容 */}
      {!messages?.length ? (
        <MessageListEmptyIndicator />
      ) : (
        <MessageList Message={ChatMessage} />
      )}
    </div>
  );
};

/**
 * 聊天界面主组件
 * 
 * 整合所有聊天相关功能，包括头部、消息列表和输入区域
 */
const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onToggleSidebar,
  onNewChatMessage,
  backendUrl,
}) => {
  // 从上下文获取频道
  const { channel } = useChatContext();
  // 国际化翻译函数
  const { t } = useLocale();
  // AI代理状态
  const agentStatus = useAIAgentStatus({
    channelId: channel?.id ?? null,
    backendUrl,
  });

  /**
   * 频道消息输入组件
   * 
   * 处理频道内的消息输入和发送
   */
  const ChannelMessageInputComponent = () => {
    // 从上下文获取发送消息函数
    const { sendMessage } = useChannelActionContext();
    // 从上下文获取频道和消息
    const { channel, messages } = useChannelStateContext();
    // 获取AI状态
    const { aiState } = useAIState(channel);
    // 输入文本状态
    const [inputText, setInputText] = useState("");
    // 文本域引用
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 判断是否正在生成
    const isGenerating = aiState === "AI_STATE_THINKING" || aiState === "AI_STATE_GENERATING" || aiState === "AI_STATE_EXTERNAL_SOURCES";

    console.log("aiState", aiState);

    /**
     * 处理停止生成
     */
    const handleStopGenerating = () => {
      if (channel) {
        // 查找最新的AI消息
        const aiMessage = [...messages].reverse().find((m) => m.user?.id.startsWith("ai-bot"));
        if (aiMessage) {
          // 发送停止事件
          channel.sendEvent({
            type: "ai_indicator.stop",
            cid: channel.cid,
            message_id: aiMessage.id,
          });
        }
      }
    };

    return (
      <ChatInput
        sendMessage={sendMessage}
        value={inputText}
        onValueChange={setInputText}
        placeholder={t('input.placeholder')}
        textareaRef={textareaRef}
        showPromptToolbar={true}
        className="!p-4"
        isGenerating={isGenerating}
        onStopGenerating={handleStopGenerating}
      />
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* 增强头部 */}
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
                {channel?.data?.name || t('header.new_session')}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t('header.assistant')} • {t('header.improving')}
              </p>
            </div>
          </div>
        </div>
        {channel?.id && (
          <AIAgentControl
            status={agentStatus.status}
            loading={agentStatus.loading}
            error={agentStatus.error}
            toggleAgent={agentStatus.toggleAgent}
            checkStatus={agentStatus.checkStatus}
            channelId={channel.id}
          />
        )}
      </header>


      <div className=" min-h-0 channel_window">
        {!channel ? (
          <EmptyStateWithInput onNewChatMessage={onNewChatMessage} />
        ) : (
          <Channel channel={channel}>
            <Window>
              <MessageListContent />
              <ChannelMessageInputComponent />
            </Window>
          </Channel>
        )}
      </div>
    </div >
  )
};

export default ChatInterface;

