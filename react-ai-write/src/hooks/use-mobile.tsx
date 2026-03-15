/**
 * 检测是否为移动设备的Hook
 * @returns {boolean} 是否为移动设备
 */
import * as React from "react";

/**
 * 移动设备断点（像素）
 */
const MOBILE_BREAKPOINT = 768;

/**
 * 检测当前是否为移动设备
 * @returns {boolean} 返回true表示当前为移动设备，false表示不是
 */
export function useIsMobile() {
  /**
   * 状态：是否为移动设备
   */
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  /**
   * 监听窗口大小变化，更新移动设备状态
   */
  React.useEffect(() => {
    // 创建媒体查询对象
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // 窗口大小变化时的回调函数
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // 添加事件监听器
    mql.addEventListener("change", onChange);
    
    // 初始设置
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // 清理函数
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // 返回是否为移动设备（确保返回布尔值）
  return !!isMobile;
}
