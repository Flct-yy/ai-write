import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "/@/utils/classnames";
import { Button } from "/@/components/inputs/button";
import { carouselVariants } from "./variants/carousel";

/**
 * 轮播图API类型
 */
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

/**
 * 轮播图属性
 * @typedef {Object} CarouselProps
 * @property {CarouselOptions} [opts] - 轮播图选项
 * @property {CarouselPlugin} [plugins] - 轮播图插件
 * @property {"horizontal" | "vertical"} [orientation="horizontal"] - 轮播方向
 * @property {Function} [setApi] - 设置API回调函数
 */
type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

/**
 * 获取轮播图上下文的Hook
 * @returns {CarouselContextProps} 轮播图上下文
 * @throws {Error} 如果在Carousel组件外部使用
 */
function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

/**
 * 轮播图容器组件
 * @param {Object} props - 组件属性
 * @param {"horizontal" | "vertical"} [props.orientation="horizontal"] - 轮播方向
 * @param {CarouselOptions} [props.opts] - 轮播图选项
 * @param {Function} [props.setApi] - 设置API回调函数
 * @param {CarouselPlugin} [props.plugins] - 轮播图插件
 * @param {string} [props.className] - 额外的类名
 * @param {React.ReactNode} props.children - 子组件
 * @param {Object} [props.ref] - React引用
 * @returns {React.ReactElement} 轮播图容器组件
 */
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn(carouselVariants.container, className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

/**
 * 轮播图内容组件
 * @param {Object} props - 组件属性
 * @param {string} [props.className] - 额外的类名
 * @param {Object} [props.ref] - React引用
 * @returns {React.ReactElement} 轮播图内容组件
 */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className={carouselVariants.content.wrapper}>
      <div
        ref={ref}
        className={cn(
          carouselVariants.content.inner.base,
          orientation === "horizontal" ? carouselVariants.content.inner.horizontal : carouselVariants.content.inner.vertical,
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

/**
 * 轮播图项组件
 * @param {Object} props - 组件属性
 * @param {string} [props.className] - 额外的类名
 * @param {Object} [props.ref] - React引用
 * @returns {React.ReactElement} 轮播图项组件
 */
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        carouselVariants.item.base,
        orientation === "horizontal" ? carouselVariants.item.horizontal : carouselVariants.item.vertical,
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

/**
 * 轮播图上一张按钮组件
 * @param {Object} props - 组件属性
 * @param {string} [props.className] - 额外的类名
 * @param {string} [props.variant="outline"] - 按钮变体
 * @param {string} [props.size="icon"] - 按钮大小
 * @param {Object} [props.ref] - React引用
 * @returns {React.ReactElement} 轮播图上一张按钮组件
 */
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        carouselVariants.button.base,
        orientation === "horizontal" ? carouselVariants.button.horizontal.previous : carouselVariants.button.vertical.previous,
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">上一张</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

/**
 * 轮播图下一张按钮组件
 * @param {Object} props - 组件属性
 * @param {string} [props.className] - 额外的类名
 * @param {string} [props.variant="outline"] - 按钮变体
 * @param {string} [props.size="icon"] - 按钮大小
 * @param {Object} [props.ref] - React引用
 * @returns {React.ReactElement} 轮播图下一张按钮组件
 */
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        carouselVariants.button.base,
        orientation === "horizontal" ? carouselVariants.button.horizontal.next : carouselVariants.button.vertical.next,
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">下一张</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
