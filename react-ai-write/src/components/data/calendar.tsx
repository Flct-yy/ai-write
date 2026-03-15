import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "/@/utils/classnames";
import { calendarVariants } from "./variants/calendar";

/**
 * 日历组件
 * @param {Object} props - 组件属性
 * @param {string} [props.className] - 额外的类名
 * @param {Object} [props.classNames] - 自定义类名
 * @param {boolean} [props.showOutsideDays=true] - 是否显示当月之外的日期
 * @returns {React.ReactElement} 日历组件
 */
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(calendarVariants.container, className)}
      classNames={{
        months: calendarVariants.months,
        month: calendarVariants.month,
        caption: calendarVariants.caption,
        caption_label: calendarVariants.caption_label,
        nav: calendarVariants.nav,
        nav_button: calendarVariants.nav_button,
        nav_button_previous: calendarVariants.nav_button_previous,
        nav_button_next: calendarVariants.nav_button_next,
        table: calendarVariants.table,
        head_row: calendarVariants.head_row,
        head_cell: calendarVariants.head_cell,
        row: calendarVariants.row,
        cell: calendarVariants.cell,
        day: calendarVariants.day,
        day_range_end: calendarVariants.day_range_end,
        day_selected: calendarVariants.day_selected,
        day_today: calendarVariants.day_today,
        day_outside: calendarVariants.day_outside,
        day_disabled: calendarVariants.day_disabled,
        day_range_middle: calendarVariants.day_range_middle,
        day_hidden: calendarVariants.day_hidden,
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
