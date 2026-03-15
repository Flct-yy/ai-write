import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "/@/utils/classnames";
import { chartContainerVariants, chartTooltipContentVariants, chartLegendContentVariants } from "./variants/chart";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

/**
 * 图表配置类型
 * @typedef {Object} ChartConfig
 * @property {Object} [key] - 图表数据系列配置
 * @property {React.ReactNode} [key.label] - 系列标签
 * @property {React.ComponentType} [key.icon] - 系列图标
 * @property {string} [key.color] - 系列颜色（适用于所有主题）
 * @property {Object} [key.theme] - 主题特定颜色
 * @property {string} [key.theme.light] - 浅色主题颜色
 * @property {string} [key.theme.dark] - 深色主题颜色
 */
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

/**
 * 获取图表配置的Hook
 * @returns {ChartContextProps} 图表配置
 * @throws {Error} 如果在ChartContainer外部使用
 */
function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

/**
 * 图表容器组件
 * @param {Object} props - 组件属性
 * @param {string} [props.id] - 图表ID
 * @param {string} [props.className] - 额外的类名
 * @param {ChartConfig} props.config - 图表配置
 * @param {React.ReactNode} props.children - 图表子组件（Recharts组件）
 * @param {Object} [props.ref] - React引用
 * @returns {React.ReactElement} 图表容器元素
 */
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          chartContainerVariants.base,
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

/**
 * 图表样式组件，用于主题特定颜色
 * @param {Object} props - 组件属性
 * @param {string} props.id - 图表ID
 * @param {ChartConfig} props.config - 图表配置
 * @returns {React.ReactElement | null} 样式元素或null
 */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

/**
 * Recharts提示框组件
 */
const ChartTooltip = RechartsPrimitive.Tooltip;

/**
 * 图表提示框内容组件
 * @param {Object} props - 组件属性
 * @param {boolean} [props.active] - 提示框是否激活
 * @param {Array} [props.payload] - 提示框数据载荷
 * @param {string} [props.className] - 额外的类名
 * @param {"line" | "dot" | "dashed"} [props.indicator="dot"] - 指示器类型
 * @param {boolean} [props.hideLabel=false] - 是否隐藏标签
 * @param {boolean} [props.hideIndicator=false] - 是否隐藏指示器
 * @param {React.ReactNode} [props.label] - 提示框标签
 * @param {Function} [props.labelFormatter] - 标签格式化函数
 * @param {string} [props.labelClassName] - 标签类名
 * @param {Function} [props.formatter] - 值格式化函数
 * @param {string} [props.color] - 指示器颜色
 * @param {string} [props.nameKey] - 数据名称键
 * @param {string} [props.labelKey] - 标签键
 * @param {Object} [props.ref] - React引用
 * @returns {React.ReactElement | null} 提示框内容或null
 */
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          chartTooltipContentVariants.base,
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  chartTooltipContentVariants.item.base,
                  indicator === "dot" && chartTooltipContentVariants.item.dot
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            chartTooltipContentVariants.indicator[indicator],
                            nestLabel && indicator === "dashed" && chartTooltipContentVariants.item.dashed
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        chartTooltipContentVariants.content.base,
                        nestLabel ? chartTooltipContentVariants.content.nestLabel : chartTooltipContentVariants.content.normal
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";

/**
 * Recharts图例组件
 */
const ChartLegend = RechartsPrimitive.Legend;

/**
 * 图表图例内容组件
 * @param {Object} props - 组件属性
 * @param {string} [props.className] - 额外的类名
 * @param {boolean} [props.hideIcon=false] - 是否隐藏图标
 * @param {Array} [props.payload] - 图例数据载荷
 * @param {"top" | "bottom"} [props.verticalAlign="bottom"] - 垂直对齐方式
 * @param {string} [props.nameKey] - 数据名称键
 * @param {Object} [props.ref] - React引用
 * @returns {React.ReactElement | null} 图例内容或null
 */
const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          chartLegendContentVariants.base,
          chartLegendContentVariants.verticalAlign[verticalAlign],
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                chartLegendContentVariants.item
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className={chartLegendContentVariants.icon}
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegend";

/**
 * 从数据载荷中提取项目配置的辅助函数
 * @param {ChartConfig} config - 图表配置
 * @param {unknown} payload - 数据载荷
 * @param {string} key - 配置键
 * @returns {Object | undefined} 项目配置
 */
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
