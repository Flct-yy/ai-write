import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { sonnerVariants } from "./variants/sonner";

/**
 * 提示框容器组件
 * @param {Object} props - 组件属性
 * @returns {React.ReactElement} 提示框容器组件
 */
type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={sonnerVariants.container}
      toastOptions={{
        classNames: {
          toast: sonnerVariants.toast,
          description: sonnerVariants.description,
          actionButton: sonnerVariants.actionButton,
          cancelButton: sonnerVariants.cancelButton,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
