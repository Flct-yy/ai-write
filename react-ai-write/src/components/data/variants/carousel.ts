import { cn } from "/@/utils/classnames";

export const carouselVariants = {
  container: "relative",
  content: {
    wrapper: "overflow-hidden",
    inner: {
      base: "flex",
      horizontal: "-ml-4",
      vertical: "-mt-4 flex-col"
    }
  },
  item: {
    base: "min-w-0 shrink-0 grow-0 basis-full",
    horizontal: "pl-4",
    vertical: "pt-4"
  },
  button: {
    base: "absolute h-8 w-8 rounded-full",
    horizontal: {
      previous: "left-4 top-1/2 -translate-y-1/2",
      next: "right-4 top-1/2 -translate-y-1/2"
    },
    vertical: {
      previous: "top-4 left-1/2 -translate-x-1/2 rotate-90",
      next: "bottom-4 left-1/2 -translate-x-1/2 rotate-90"
    }
  }
};
