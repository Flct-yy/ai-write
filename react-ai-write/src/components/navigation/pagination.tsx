/**
 * Pagination 组件
 * 
 * 一个用于分页导航的组件，提供了完整的分页功能，包括上一页、下一页、页码链接和省略号。
 * 
 * @example
 * ```tsx
 * import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "./components/navigation/pagination"
 * 
 * function Example() {
 *   return (
 *     <Pagination>
 *       <PaginationContent>
 *         <PaginationItem>
 *           <PaginationPrevious href="#" />
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationLink href="#" isActive>1</PaginationLink>
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationLink href="#">2</PaginationLink>
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationLink href="#">3</PaginationLink>
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationEllipsis />
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationLink href="#">10</PaginationLink>
 *         </PaginationItem>
 *         <PaginationItem>
 *           <PaginationNext href="#" />
 *         </PaginationItem>
 *       </PaginationContent>
 *     </Pagination>
 *   )
 * }
 * ```
 */
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { ButtonProps } from "/@/components/inputs/button";
import { buttonVariants } from "/@/components/inputs/variants/button";
import { paginationClassName, paginationContentClassName, paginationEllipsisClassName, paginationNextClassName, paginationPreviousClassName } from "/@/components/navigation/variants/pagination";

/**
 * 分页导航容器
 * 
 * @param {React.ComponentProps<"nav">} props - 组件属性
 * @returns {React.ReactElement} Pagination 组件实例
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn(paginationClassName, className)}
    {...props}
  />
);

// 设置组件显示名称，用于 React DevTools 调试
Pagination.displayName = "Pagination";

/**
 * 分页内容容器
 * 
 * @param {React.ComponentProps<"ul">} props - 组件属性
 * @param {React.Ref<HTMLUListElement>} ref - 组件引用
 * @returns {React.ReactElement} PaginationContent 组件实例
 */
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(paginationContentClassName, className)}
    {...props}
  />
));

// 设置组件显示名称，用于 React DevTools 调试
PaginationContent.displayName = "PaginationContent";

/**
 * 分页项容器
 * 
 * @param {React.ComponentProps<"li">} props - 组件属性
 * @param {React.Ref<HTMLLIElement>} ref - 组件引用
 * @returns {React.ReactElement} PaginationItem 组件实例
 */
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));

// 设置组件显示名称，用于 React DevTools 调试
PaginationItem.displayName = "PaginationItem";

/**
 * 分页链接属性
 */
type PaginationLinkProps = {
  /** 是否为当前活动页 */
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

/**
 * 分页链接
 * 
 * @param {PaginationLinkProps} props - 组件属性
 * @param {boolean} props.isActive - 是否为当前活动页
 * @param {ButtonProps["size"]} props.size - 按钮大小，默认为 "icon"
 * @returns {React.ReactElement} PaginationLink 组件实例
 */
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);

// 设置组件显示名称，用于 React DevTools 调试
PaginationLink.displayName = "PaginationLink";

/**
 * 上一页按钮
 * 
 * @param {React.ComponentProps<typeof PaginationLink>} props - 组件属性
 * @returns {React.ReactElement} PaginationPrevious 组件实例
 */
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn(paginationPreviousClassName, className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);

// 设置组件显示名称，用于 React DevTools 调试
PaginationPrevious.displayName = "PaginationPrevious";

/**
 * 下一页按钮
 * 
 * @param {React.ComponentProps<typeof PaginationLink>} props - 组件属性
 * @returns {React.ReactElement} PaginationNext 组件实例
 */
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(paginationNextClassName, className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);

// 设置组件显示名称，用于 React DevTools 调试
PaginationNext.displayName = "PaginationNext";

/**
 * 分页省略号
 * 
 * @param {React.ComponentProps<"span">} props - 组件属性
 * @returns {React.ReactElement} PaginationEllipsis 组件实例
 */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(paginationEllipsisClassName, className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

// 设置组件显示名称，用于 React DevTools 调试
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
