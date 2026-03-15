/**
 * 表格组件
 * 提供统一的表格样式和 API
 */
import * as React from "react";

import { cn } from "/@/utils/classnames";
import { tableContainerClassName, tableClassName, tableHeaderClassName, tableBodyClassName, tableFooterClassName, tableRowClassName, tableHeadClassName, tableCellClassName, tableCaptionClassName } from "./variants/table";

/**
 * 表格
 * @param {React.HTMLAttributes<HTMLTableElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的表格组件
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className={tableContainerClassName}>
    <table
      ref={ref}
      className={cn(tableClassName, className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/**
 * 表格头部
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的表格头部组件
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(tableHeaderClassName, className)} {...props} />
));
TableHeader.displayName = "TableHeader";

/**
 * 表格主体
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的表格主体组件
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(tableBodyClassName, className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/**
 * 表格底部
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的表格底部组件
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(tableFooterClassName, className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/**
 * 表格行
 * @param {React.HTMLAttributes<HTMLTableRowElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的表格行组件
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(tableRowClassName, className)}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/**
 * 表格表头
 * @param {React.ThHTMLAttributes<HTMLTableCellElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的表格表头组件
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(tableHeadClassName, className)}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/**
 * 表格单元格
 * @param {React.TdHTMLAttributes<HTMLTableCellElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的表格单元格组件
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(tableCellClassName, className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/**
 * 表格标题
 * @param {React.HTMLAttributes<HTMLTableCaptionElement>} props - 组件属性
 * @returns {React.ReactElement} 渲染的表格标题组件
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(tableCaptionClassName, className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
