/**
 * 写作提示工具栏组件
 * 
 * 提供一系列写作提示按钮，帮助用户快速应用常见的写作操作
 * 包含展开/收起功能，显示常用提示和完整提示列表
 */

// 导入按钮组件
import { Button } from "/@/components/inputs/button";
// 导入滚动区域组件
import { ScrollArea } from "/@/components/layout/scroll-area";
// 导入图标
import {
  ChevronDown,  // 向下箭头图标
  ChevronUp,    // 向上箭头图标
} from "lucide-react";
// 导入React和相关钩子
import React, { useMemo, useState } from "react";
// 导入国际化钩子
import { useLocale } from "/@/hooks/use-locale";
// 导入提示配置
import { PromptConfig, toolbarPrompts } from "./types/writing-prompts-config";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup } from "/@/components/interaction/dropdown-menu";

/**
 * 写作提示工具栏组件属性接口
 */
export interface WritingPromptsToolbarProps {
  /** 选择提示的回调函数，当用户选择提示时触发 */
  onPromptSelect: (prompt: string) => void;
  /** 自定义类名，用于覆盖默认样式 */
  className?: string;
}

/**
 * 提示按钮组件
 * 
 * 用于显示单个提示按钮，支持不同样式变体
 */
interface PromptButtonProps {
  /** 提示配置，包含图标、文本和分类信息 */
  prompt: PromptConfig;
  /** 点击回调函数 */
  onClick: () => void;
  /** 按钮变体样式：outline（轮廓）或ghost（幽灵） */
  variant: "outline" | "ghost";
  /** 按钮尺寸 */
  size: "sm";
  /** 自定义类名 */
  className?: string;
}

/**
 * 提示按钮组件实现
 */
const PromptButton: React.FC<PromptButtonProps> = ({
  prompt,
  onClick,
  variant,
  size,
  className = "",
}) => {
  // 获取国际化翻译函数
  const { t } = useLocale();
  // 动态获取图标组件
  const IconComponent = prompt.icon;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
    >
      {/* 根据变体调整图标大小和样式 */}
      <IconComponent className={`h-${variant === "ghost" ? "4" : "3"} w-${variant === "ghost" ? "4" : "3"} mr-1 ${variant === "ghost" ? "flex-shrink-0" : ""}`} />
      {/* 根据变体显示不同的内容结构 */}
      {variant === "ghost" ? (
        <div className="flex-1 min-w-0">
          <div className="truncate font-medium">
            {t(prompt.textKey)}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {t(prompt.categoryKey)}
          </div>
        </div>
      ) : (
        <span className="whitespace-nowrap">{t(prompt.textKey)}</span>
      )}
    </Button>
  );
};

/**
 * 提示菜单组件
 * 
 * 当工具栏展开时显示的完整提示列表
 */
interface PromptMenuProps {
  /** 是否展开状态 */
  isExpanded: boolean;
  /** 关闭菜单的回调函数 */
  onClose: () => void;
  /** 选择提示的回调函数 */
  onPromptSelect: (prompt: string) => void;
}

/**
 * 提示菜单组件实现
 */
const PromptMenu: React.FC<PromptMenuProps> = ({
  isExpanded,
  onClose,
  onPromptSelect,
}) => {
  // 获取国际化翻译函数
  const { t } = useLocale();

  // 如果未展开，不渲染任何内容
  if (!isExpanded) return null;

  return (
    <>
      {/* 背景遮罩，点击外部关闭菜单 */}
      <div
        className="fixed inset-0 z-10"
        onClick={onClose}
      />

      {/* 菜单内容 */}
      <div className="absolute bottom-full left-0 right-0 mb-2 z-20">
        <div className="bg-background border rounded-lg shadow-xl mx-4">
          <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {/* 遍历所有提示配置，渲染每个提示按钮 */}
            {toolbarPrompts.map((prompt, index) => (
              <PromptButton
                key={index}
                prompt={prompt}
                onClick={() => {
                  // 触发选择提示回调并关闭菜单
                  onPromptSelect(t(prompt.textKey));
                  onClose();
                }}
                variant="ghost"
                size="sm"
                className="h-auto p-2 text-xs text-left justify-start hover:bg-muted/50"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * 提示工具栏组件
 * 
 * 始终可见的工具栏部分，包含展开按钮和常用提示
 */
interface PromptToolbarProps {
  /** 选择提示的回调函数 */
  onPromptSelect: (prompt: string) => void;
  /** 当前展开状态 */
  isExpanded: boolean;
  /** 切换展开状态的回调函数 */
  onToggleExpand: () => void;
}

/**
 * 提示工具栏组件实现
 */
const PromptToolbar: React.FC<PromptToolbarProps> = ({
  onPromptSelect,
  isExpanded,
  onToggleExpand,
}) => {
  // 获取国际化翻译函数
  const { t } = useLocale();

  // 使用useMemo缓存随机生成的提示，避免每次渲染都重新随机
  const randomPrompts = useMemo(() => {
    // 创建提示数组的副本并随机排序
    const shuffledPrompts = [...toolbarPrompts].sort(() => Math.random() - 0.5);
    // 取前3个
    return shuffledPrompts.slice(0, 3);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // 模型选择状态
  const [selectedModel, setSelectedModel] = useState(localStorage.getItem('selected_model') || 'openai');

  // 处理模型选择变化
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem('selected_model', model);
  };

  return (
    <div className="bg-background border-t">
      <div className="flex items-center px-4 py-2 gap-2">
        {/* 模型选择下拉菜单 */}
        <DropdownMenu onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-24 h-7 px-2 text-xs font-medium flex-shrink-0"
            >
              {/* 根据展开状态显示不同的箭头图标 */}
              {isMenuOpen ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronUp className="h-4 w-4 mr-1" />
              )}
              {selectedModel === 'openai' && 'OpenAI'}
              {selectedModel === 'volcengine' && '火山引擎'}
              {selectedModel === 'zhipu' && '智谱'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleModelChange('openai')}>
              OpenAI
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleModelChange('volcengine')}>
              火山引擎
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleModelChange('zhipu')}>
              智谱
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 展开/收起按钮 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpand}
          className="h-7 px-2 text-xs font-medium flex-shrink-0"
        >
          {/* 根据展开状态显示不同的箭头图标 */}
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 mr-1" />
          ) : (
            <ChevronUp className="h-4 w-4 mr-1" />
          )}
          {/* 工具栏标题 */}
          {t('toolbar.title')}
        </Button>

        {/* 滚动区域，显示前3个提示 */}
        <ScrollArea className="flex-1 max-w-full">
          <div className="flex gap-1 pb-1">
            {/* 显示缓存的随机提示 */}
            {randomPrompts.map((prompt, index) => (
              <PromptButton
                key={prompt.textKey}
                prompt={prompt}
                onClick={() => onPromptSelect(t(prompt.textKey))}
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs whitespace-nowrap flex-shrink-0 hover:bg-muted/50"
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

/**
 * 写作提示工具栏主组件
 * 
 * 整合提示菜单和工具栏，管理展开状态
 */
const WritingPromptsToolbarComponent: React.FC<WritingPromptsToolbarProps> = ({
  onPromptSelect,
  className = "",
}) => {
  // 展开状态状态管理
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* 展开菜单组件 */}
      <PromptMenu
        isExpanded={isExpanded}
        onClose={() => setIsExpanded(false)}
        onPromptSelect={onPromptSelect}
      />

      {/* 工具栏组件 - 始终可见 */}
      <PromptToolbar
        onPromptSelect={onPromptSelect}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />
    </div>
  );
};

/**
 * 包装后的写作提示工具栏组件
 * 使用React.memo避免不必要的重新渲染
 */
export const WritingPromptsToolbar = React.memo(WritingPromptsToolbarComponent);
