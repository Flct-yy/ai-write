/**
 * Resizable 组件
 * 
 * 一个基于 react-resizable-panels 的可调整大小面板组件，用于创建可拖动调整大小的布局。
 * 
 * @example
 * ```tsx
 * import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/layout/resizable"
 * 
 * function Example() {
 *   return (
 *     <ResizablePanelGroup direction="horizontal">
 *       <ResizablePanel defaultSize={30}>
 *         <div className="p-4 bg-gray-100">左侧面板</div>
 *       </ResizablePanel>
 *       <ResizableHandle withHandle />
 *       <ResizablePanel defaultSize={40}>
 *         <div className="p-4 bg-gray-200">中间面板</div>
 *       </ResizablePanel>
 *       <ResizableHandle withHandle />
 *       <ResizablePanel defaultSize={30}>
 *         <div className="p-4 bg-gray-300">右侧面板</div>
 *       </ResizablePanel>
 *     </ResizablePanelGroup>
 *   )
 * }
 * ```
 */
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "/@/utils/classnames";
import { resizableClassName, resizableHandleClassName, resizableHandleIconContainerClassName, resizableHandleIconClassName } from "./variants/resizable";

/**
 * 可调整大小的面板组
 * 
 * @param {React.ComponentProps<typeof ResizablePrimitive.PanelGroup>} props - 组件属性
 * @returns {React.ReactElement} ResizablePanelGroup 组件实例
 */
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      resizableClassName,
      className
    )}
    {...props}
  />
);

/**
 * 可调整大小的面板
 * 
 * 直接使用 react-resizable-panels 的 Panel 组件
 */
const ResizablePanel = ResizablePrimitive.Panel;

/**
 * 可调整大小的手柄
 * 
 * @param {React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & { withHandle?: boolean }} props - 组件属性
 * @param {boolean} props.withHandle - 是否显示调整手柄图标
 * @returns {React.ReactElement} ResizableHandle 组件实例
 */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      resizableHandleClassName,
      className
    )}
    {...props}
  >
    {/* 显示调整手柄图标 */}
    {withHandle && (
      <div className={resizableHandleIconContainerClassName}>
        <GripVertical className={resizableHandleIconClassName} />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
