import { cva, type VariantProps } from "class-variance-authority";

// 侧边栏遮罩层
export const sheetOverlayClassName = "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

// 侧边栏内容变体
export const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

// 侧边栏关闭按钮
export const sheetCloseClassName = "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary";

// 侧边栏头部
export const sheetHeaderClassName = "flex flex-col space-y-2 text-center sm:text-left";

// 侧边栏底部
export const sheetFooterClassName = "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";

// 侧边栏标题
export const sheetTitleClassName = "text-lg font-semibold text-foreground";

// 侧边栏描述
export const sheetDescriptionClassName = "text-sm text-muted-foreground";

export type SheetVariants = VariantProps<typeof sheetVariants>;