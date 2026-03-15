// 表格容器
const tableContainerClassName = "relative w-full overflow-auto";

// 表格
const tableClassName = "w-full caption-bottom text-sm";

// 表格头部
const tableHeaderClassName = "[&_tr]:border-b";

// 表格主体
const tableBodyClassName = "[&_tr:last-child]:border-0";

// 表格底部
const tableFooterClassName = "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0";

// 表格行
const tableRowClassName = "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted";

// 表格表头
const tableHeadClassName = "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0";

// 表格单元格
const tableCellClassName = "p-4 align-middle [&:has([role=checkbox])]:pr-0";

// 表格标题
const tableCaptionClassName = "mt-4 text-sm text-muted-foreground";

export { tableContainerClassName, tableClassName, tableHeaderClassName, tableBodyClassName, tableFooterClassName, tableRowClassName, tableHeadClassName, tableCellClassName, tableCaptionClassName };