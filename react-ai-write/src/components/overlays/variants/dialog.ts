// 对话框遮罩层
import { X } from "lucide-react";

export const dialogOverlayClassName = "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

// 对话框内容
export const dialogContentClassName = "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg";

// 对话框关闭按钮
export const dialogCloseClassName = "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground";

// 对话框头部
export const dialogHeaderClassName = "flex flex-col space-y-1.5 text-center sm:text-left";

// 对话框底部
export const dialogFooterClassName = "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";

// 对话框标题
export const dialogTitleClassName = "text-lg font-semibold leading-none tracking-tight";

// 对话框描述
export const dialogDescriptionClassName = "text-sm text-muted-foreground";

// 对话框关闭图标
export const DialogCloseIcon = X;