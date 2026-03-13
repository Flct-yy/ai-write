/**
 * AspectRatio 组件
 * 
 * 一个基于 Radix UI 的宽高比组件，用于保持内容的特定宽高比。
 * 
 * @example
 * ```tsx
 * import { AspectRatio } from "./components/layout/aspect-ratio"
 * 
 * function Example() {
 *   return (
 *     <div className="w-full max-w-md">
 *       <AspectRatio ratio={16 / 9} className="bg-gray-200">
 *         <img src="https://example.com/image.jpg" alt="示例图片" className="object-cover w-full h-full" />
 *       </AspectRatio>
 *     </div>
 *   )
 * }
 * ```
 * 
 * @description
 * AspectRatio 组件用于创建一个保持特定宽高比的容器，无论内容大小如何变化。
 * 这对于显示图片、视频或其他需要固定比例的内容非常有用。
 * 
 * @param {React.ComponentProps<typeof AspectRatioPrimitive.Root>} props - 组件属性
 * @param {number} props.ratio - 宽高比，例如 16/9、4/3 等
 * @returns {React.ReactElement} AspectRatio 组件实例
 */
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

/**
 * AspectRatio 组件
 * 
 * 直接使用 Radix UI 的 AspectRatio 组件，用于保持内容的特定宽高比。
 */
const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
