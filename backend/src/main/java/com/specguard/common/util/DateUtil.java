package com.specguard.common.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.Optional;
import java.util.function.Consumer;
import lombok.experimental.UtilityClass;

@UtilityClass
public class DateUtil {

    private static final DateTimeFormatter YEAR_MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM");

    private static final DateTimeFormatter MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyy年M月");

    /**
     * 转化为月份key， 仅用于本系统
     *
     * @param localDate 日期
     * @return 格式化的key
     */
    public static String toMonthKey(LocalDate localDate) {
        return Optional.ofNullable(localDate)
                .map(d -> d.format(YEAR_MONTH_FORMATTER)).orElse("");
    }

    /**
     * 转化为月份key， 仅用于本系统
     *
     * @param localDate 日期
     * @return 格式化的key
     */
    public static String toMonthStr(LocalDate localDate) {
        return Optional.ofNullable(localDate)
                .map(d -> d.format(MONTH_FORMATTER)).orElse("");
    }

    /**
     * 遍历从开始日期到结束日期之间的所有日期，对每个日期执行给定的消费函数。
     *
     * @param startDate 遍历的起始日期，包含此日期。
     * @param endDate   遍历的结束日期，不包含此日期。
     * @param consumer  一个消费函数，接受一个 LocalDate 参数，用于对每个日期执行操作。
     */
    public static void forEach(LocalDate startDate, LocalDate endDate, Consumer<LocalDate> consumer) {
        LocalDate current = startDate; // 当前操作日期初始化为开始日期
        while (!current.isAfter(endDate)) { // 当当前日期不超过结束日期时继续循环
            consumer.accept(current); // 执行消费函数，处理当前日期
            // 进入下一个月
            current = current.plusMonths(1); // 将当前日期增加一个月，准备处理下一个日期
        }
    }

    /**
     * 获取给定日期所在月份的第一天
     *
     * @param date 输入日期
     * @return 当月第一天的日期
     */
    public static LocalDate getFirstDayOfMonth(LocalDate date) {
        return date.with(TemporalAdjusters.firstDayOfMonth());
    }

    /**
     * 获取给定日期所在月份的最后一天
     *
     * @param date 输入日期
     * @return 当月最后一天的日期
     */
    public static LocalDate getLastDayOfMonth(LocalDate date) {
        return date.with(TemporalAdjusters.lastDayOfMonth());
    }

}
