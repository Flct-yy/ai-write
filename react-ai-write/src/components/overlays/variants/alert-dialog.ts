// 警告对话框遮罩层
export const alertDialogOverlayClassName = "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

// 警告对话框内容
export const alertDialogContentClassName = "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg";

// 警告对话框头部
export const alertDialogHeaderClassName = "flex flex-col space-y-2 text-center sm:text-left";

// 警告对话框底部
export const alertDialogFooterClassName = "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";

// 警告对话框标题
export const alertDialogTitleClassName = "text-lg font-semibold";

// 警告对话框描述
export const alertDialogDescriptionClassName = "text-sm text-muted-foreground";

// 警告对话框操作按钮
export const alertDialogActionClassName = "";

// 警告对话框取消按钮
export const alertDialogCancelClassName = "mt-2 sm:mt-0";