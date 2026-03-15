/**
 * 聊天侧边栏组件
 * 显示用户的写作会话列表，提供新建会话、切换主题和登出功能
 */

// 导入头像组件
import { Avatar, AvatarFallback, AvatarImage } from "/@/components/display/avatar";

// 导入按钮组件
import { Button } from "/@/components/inputs/button";

// 导入下拉菜单组件
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "/@/components/interaction/dropdown-menu";

// 导入滚动区域组件
import { ScrollArea } from "/@/components/layout/scroll-area";

// 导入类名工具
import { cn } from "/@/utils/classnames";

// 导入图标
import {
  LogOut,
  MessageCircle,
  MessageSquare,
  Moon,
  PlusCircle,
  Sun,
  Trash2,
  X,
} from "lucide-react";

// 导入路由钩子
import { useNavigate } from "react-router-dom";

// 导入Stream Chat类型
import { Channel, ChannelFilters, ChannelSort } from "stream-chat";

// 导入Stream Chat组件和上下文
import { ChannelList, useChatContext } from "stream-chat-react";

// 导入主题钩子
import { useTheme } from "../hooks/use-theme";

// 导入国际化钩子
import { useLocale } from "../hooks/use-locale";
// 导入语言枚举
import { Locale } from "../i18n/locale";

/**
 * 聊天侧边栏属性接口
 */
interface ChatSidebarProps {
  /** 侧边栏是否打开 */
  isOpen: boolean;
  /** 关闭侧边栏回调 */
  onClose: () => void;
  /** 登出回调 */
  onLogout: () => void;
  /** 新建聊天回调 */
  onNewChat: () => void;
  /** 删除频道回调 */
  onChannelDelete: (channel: Channel) => void;
}

/**
 * 频道列表空状态指示器
 * 当没有写作会话时显示
 */
const ChannelListEmptyStateIndicator = () => {
  // 国际化钩子
  const { t } = useLocale();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/15 via-primary/8 to-transparent rounded-2xl flex items-center justify-center shadow-sm border border-primary/10">
          <MessageCircle className="h-8 w-8 text-primary/70" />
        </div>
      </div>
      <div className="space-y-2 max-w-xs">
        <h3 className="text-sm font-medium text-foreground">
          {t('no_writing_sessions')}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t('start_new_session')}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground/60">
        <span>{t('click_new_session')}</span>
      </div>
    </div>
  );
};

/**
 * 聊天侧边栏组件
 */
export const ChatSidebar = ({
  isOpen,
  onClose,
  onLogout,
  onNewChat,
  onChannelDelete,
}: ChatSidebarProps) => {
  // 聊天客户端上下文
  const { client, setActiveChannel } = useChatContext();

  // 当前用户
  const { user } = client;

  // 主题状态管理
  const { theme, setTheme } = useTheme();

  // 国际化钩子
  const { t, locale, setLocale } = useLocale();

  // 路由导航
  const navigate = useNavigate();

  // 如果用户不存在，返回null
  if (!user) return null;

  // 频道过滤器：只显示当前用户参与的消息频道
  const filters: ChannelFilters = {
    type: "messaging",
    members: { $in: [user.id] },
  };

  // 频道排序：按最后消息时间倒序
  const sort: ChannelSort = { last_message_at: -1 };

  // 频道查询选项
  const options = { state: true, presence: true, limit: 10 };

  return (
    <>
      {/* 移动端背景遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏容器 */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-80 bg-background border-r flex flex-col transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* 侧边栏头部 */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{t('writing_sessions')}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* 频道列表 */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-0">
            <ChannelList
              filters={filters}
              sort={sort}
              options={options}
              EmptyStateIndicator={ChannelListEmptyStateIndicator}
              Preview={(previewProps) => (
                <div
                  className={cn(
                    "flex items-center p-2 rounded-lg cursor-pointer transition-colors relative group mb-1",
                    previewProps.active
                      ? "bg-primary/20 text-primary-foreground"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => {
                    // 设置活动频道
                    setActiveChannel(previewProps.channel);
                    // 导航到聊天页面
                    navigate(`/chat/${previewProps.channel.id}`);
                    // 关闭侧边栏
                    onClose();
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span className="flex-1 truncate text-sm font-medium">
                    {previewProps.channel.data?.name || t('new_writing_session')}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={async (e) => {
                      // 阻止事件冒泡
                      e.stopPropagation();
                      // 调用删除频道回调
                      onChannelDelete(previewProps.channel);
                    }}
                    title={t('delete_session')}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground/70 hover:text-destructive" />
                  </Button>
                </div>
              )}
            />
          </div>
        </ScrollArea>

        {/* 新建聊天按钮 */}
        <div className="p-2 border-t">
          <Button onClick={onNewChat} className="w-full justify-start">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('new_writing_session')}
          </Button>
        </div>

        {/* 用户资料/登出 */}
        <div className="p-2 border-t bg-background">
          <div className="flex items-center justify-between">
            {/* 用户信息 */}
            <Button
              variant="ghost"
              className="flex-1 justify-start items-center p-2 h-auto"
            >
              <Avatar className="w-8 h-8 mr-2">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="font-semibold text-sm truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{t('online')}</p>
              </div>
            </Button>

            {/* 语言切换按钮 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocale(locale === Locale.Chinese ? Locale.English : Locale.Chinese)}
              className="h-10 w-10 mr-2"
              title={locale === Locale.Chinese ? "切换到英文" : "Switch to Chinese"}
            >
              <span className="text-sm font-medium">
                {locale === Locale.Chinese ? "EN" : "中"}
              </span>
            </Button>

            {/* 主题切换按钮 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10 mr-2"
              title={theme === "dark" ? t('switch_to_light_theme') : t('switch_to_dark_theme')}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* 登出 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="h-10 w-10">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
