/**
 * 写作提示配置
 */

import React from "react";
import {
  Briefcase,
  List,
  Minimize2,
  Palette,
  PenLine,
  Smile,
  SpellCheck,
  Type,
} from "lucide-react";

/**
 * 提示配置接口
 */
export interface PromptConfig {
  /** 图标组件 */
  icon: React.ElementType;
  /** 文本国际化键 */
  textKey: string;
  /** 分类国际化键 */
  categoryKey: string;
}

/**
 * 工具栏提示配置
 */
export const toolbarPrompts: PromptConfig[] = [
  {
    icon: SpellCheck,
    textKey: "fix_grammar",
    categoryKey: "categories.editing",
  },   
  {
    icon: Minimize2,
    textKey: "make_concise",
    categoryKey: "categories.refinement",
  },
  {
    icon: Briefcase,
    textKey: "make_professional",
    categoryKey: "categories.tone",
  },
  {
    icon: Smile,
    textKey: "make_human",
    categoryKey: "categories.style",
  },
  {
    icon: List,
    textKey: "summarize",
    categoryKey: "categories.summary",
  },
  {
    icon: PenLine,
    textKey: "continue_writing",
    categoryKey: "categories.generation",
  },
  {
    icon: Type,
    textKey: "suggest_title",
    categoryKey: "categories.ideas",
  },
  {
    icon: Palette,
    textKey: "change_tone",
    categoryKey: "categories.tone",
  },
];
