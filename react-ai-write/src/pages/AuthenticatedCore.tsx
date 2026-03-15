/**
 * 认证核心组件
 * 管理已登录用户的聊天界面和相关功能
 */

// 导入下拉菜单组件
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "/@/components/overlays/alert-dialog";

// 导入加载图标
import { Loader2 } from "lucide-react";

// 导入React钩子
import { useEffect, useState } from "react";

// 导入路由钩子
import { useNavigate, useParams } from "react-router-dom";

// 导入Stream Chat类型
import { Channel, User } from "stream-chat";

// 导入Stream Chat上下文
import { useChatContext } from "stream-chat-react";

// 导入UUID生成器
import { v4 as uuidv4 } from "uuid";

// 导入聊天组件（暂时注释，文件不存在）
import ChatInterface from "./ChatInterface";

// 导入侧边栏组件
import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
} from "/@/components/layout/sidebar";
import { ChatSidebar } from "./ChatSidebar";

/**
 * 认证核心组件属性
 */
interface AuthenticatedCoreProps {
  /** 当前用户信息 */
  user: User;
  /** 登出回调函数 */
  onLogout: () => void;
}

/**
 * 认证核心组件
 * 处理用户已登录后的聊天界面和功能
 */
const AuthenticatedCore = ({ user, onLogout }: AuthenticatedCoreProps) => {
  // 侧边栏状态管理
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 删除对话框状态管理
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 待删除的频道
  const [channelToDelete, setChannelToDelete] = useState<Channel | null>(null);

  // 聊天客户端上下文
  const { client, setActiveChannel } = useChatContext();

  // 路由导航
  const navigate = useNavigate();

  // 从URL获取频道ID
  const { channelId } = useParams<{ channelId: string }>();

  // 后端API地址
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  /**
   * 同步URL中的频道ID与当前活动频道
   */
  useEffect(() => {
    const syncChannelWithUrl = async () => {
      // 如果客户端未初始化，直接返回
      if (!client) return;

      // 如果URL中有频道ID，加载并设置为活动频道
      if (channelId) {
        const channel = client.channel("messaging", channelId);
        await channel.watch();
        setActiveChannel(channel);
      } else {
        // 如果URL中没有频道ID，清除活动频道
        setActiveChannel(undefined);
      }
    };

    // 执行同步
    syncChannelWithUrl();
  }, [channelId, client, setActiveChannel]);

  /**
   * 处理新聊天消息
   * @param message 消息对象
   */
  const handleNewChatMessage = async (message: { text: string }) => {
    // 确保用户ID存在
    if (!user.id) return;

    try {
      // 1. 创建一个新的频道，仅包含当前用户
      const newChannel = client.channel("messaging", uuidv4(), {
        name: message.text.substring(0, 50), // 使用消息文本的前50个字符作为频道名称
        members: [user.id],
      });
      await newChannel.watch();

      // 2. 设置事件监听器，等待AI代理加入频道
      const memberAddedPromise = new Promise<void>((resolve) => {
        const unsubscribe = newChannel.on("member.added", (event) => {
          // 检查添加的成员是否是AI代理（不是当前用户）
          if (event.member?.user?.id && event.member.user.id !== user.id) {
            unsubscribe.unsubscribe();
            resolve();
          }
        });
      });

      // 3. 连接AI代理
      const response = await fetch(`${backendUrl}/start-ai-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel_id: newChannel.id,
          channel_type: "messaging",
        }),
      });

      if (!response.ok) {
        throw new Error("AI agent failed to join the chat.");
      }

      // 4. 设置频道为活动状态并导航
      setActiveChannel(newChannel);
      navigate(`/chat/${newChannel.id}`);

      // 5. 等待AI代理加入频道，然后发送消息
      await memberAddedPromise;
      await newChannel.sendMessage(message);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      console.error("Error creating new chat:", errorMessage);
    }
  };

  /**
   * 处理新建聊天点击
   */
  const handleNewChatClick = () => {
    // 清除活动频道
    setActiveChannel(undefined);
    // 导航到根路径
    navigate("/");
    // 关闭侧边栏
    setSidebarOpen(false);
  };

  /**
   * 处理删除频道点击
   * @param channel 要删除的频道
   */
  const handleDeleteClick = (channel: Channel) => {
    // 设置要删除的频道
    setChannelToDelete(channel);
    // 显示删除确认对话框
    setShowDeleteDialog(true);
  };

  /**
   * 处理删除确认
   */
  const handleDeleteConfirm = async () => {
    if (channelToDelete) {
      try {
        // 如果当前正在查看要删除的频道，导航到根路径
        if (channelId === channelToDelete.id) {
          navigate("/");
        }
        // 删除频道
        await channelToDelete.delete();
      } catch (error) {
        console.error("Error deleting channel:", error);
      }
    }
    // 关闭删除对话框
    setShowDeleteDialog(false);
    // 清除要删除的频道
    setChannelToDelete(null);
  };

  /**
   * 处理删除取消
   */
  const handleDeleteCancel = () => {
    // 关闭删除对话框
    setShowDeleteDialog(false);
    // 清除要删除的频道
    setChannelToDelete(null);
  };

  // 如果客户端未初始化，显示加载状态
  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">
          Connecting to chat...
        </p>
      </div>
    );
  }

  // const filters: ChannelFilters = {
  //   type: "messaging",
  //   members: { $in: [user.id] },
  // };
  // const sort: ChannelSort = { last_message_at: -1 };
  const options = { state: true, presence: true, limit: 10 };

  return (
    <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex h-full w-full">
        <Sidebar collapsible="offcanvas">
          <ChatSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onLogout={onLogout}
            onNewChat={handleNewChatClick}
            onChannelDelete={handleDeleteClick} />
        </Sidebar>
        <SidebarInset>
          <ChatInterface
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onNewChatMessage={handleNewChatMessage}
            backendUrl={backendUrl}
          />
        </SidebarInset>

        {/* 删除写作会话确认对话框 */}
        {/* <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Writing Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this writing session? This action
              cannot be undone and all content will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
      </div>
    </SidebarProvider>
  );
};

export default AuthenticatedCore;