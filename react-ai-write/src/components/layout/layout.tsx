/**
 * 布局组件
 * 
 * 提供常见的布局模式，如左右分栏布局
 */

import React, { ReactNode } from "react";
import { cn } from "/@/utils/classnames";

/**
 * 左右分栏布局组件属性
 */
interface SplitLayoutProps {
  /**
   * 左侧内容
   */
  left: ReactNode;
  /**
   * 右侧内容
   */
  right: ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 左侧宽度
   * 默认值: 1/2
   */
  leftWidth?: string;
  /**
   * 右侧宽度
   * 默认值: 1/2
   */
  rightWidth?: string;
  /**
   * 是否在移动设备上堆叠
   * 默认值: true
   */
  stackOnMobile?: boolean;
}

/**
 * 左右分栏布局组件
 */
export const SplitLayout: React.FC<SplitLayoutProps> = ({
  left,
  right,
  className,
  leftWidth = "1/2",
  rightWidth = "1/2",
  stackOnMobile = true,
}) => {
  return (
    <div className={cn(
      "flex h-screen overflow-hidden",
      stackOnMobile && "flex-col md:flex-row",
      className
    )}>
      {/* 左侧 */}
      <div className={cn(
        "flex",
        stackOnMobile ? "w-full md:w-" + leftWidth : "w-" + leftWidth
      )}>
        {left}
      </div>
      {/* 右侧 */}
      <div className={cn(
        "flex",
        stackOnMobile ? "w-full md:w-" + rightWidth : "w-" + rightWidth
      )}>
        {right}
      </div>
    </div>
  );
};

/**
 * 页面布局组件属性
 */
interface PageLayoutProps {
  /**
   * 页面内容
   */
  children: ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 是否全屏
   * 默认值: false
   */
  fullScreen?: boolean;
}

/**
 * 页面布局组件
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  fullScreen = false,
}) => {
  return (
    <div className={cn(
      fullScreen ? "h-screen" : "min-h-screen",
      "w-full",
      className
    )}>
      {children}
    </div>
  );
};
