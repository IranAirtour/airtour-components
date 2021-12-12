import moment from 'moment';
import { DATE_TIME_FORMATTERS } from '../constants/strings';
import { leftPad } from './StringUtils';
import type {INullableDate} from "../Interface/IBase";
const momentj = require('moment-jalaali');

export default class DateTimeFormatter {
  static getISOString(): string {
    return new Date().toISOString()?.toString();
  }
  static currentYear = moment().year();
  static currentMonth = moment().month();
  static currentMonthName = moment().format('MMMM');
  static currentDay = moment().day();

  static yesterdayDate = moment().subtract(1, 'days');
  static todayDate = moment();
  static tomorrowDate = moment().add(1, 'days');

  static YEARS = Array.from({ length: 5 }, (_, i) =>
      String(DateTimeFormatter.currentYear + i),
  );
  static MONTHS = moment.months();
  static DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
  static MINUTES = Array.from({ length: 60 }, (_, i) =>
      i < 10 ? '0' + i : i.toString(),
  );
  static HOURS24 = Array.from({ length: 24 }, (_, i) =>
      i < 10 ? '0' + i : i.toString(),
  );
  static getEpoch(date: Date): number {
    // return getUnixTime(date);
    return moment(date).unix();
  }
  static convertTimeToDateTime(time: string): any {
    const [h, m] = time?.split(':');
    return moment(new Date()).set('hour', Number(h)).set('minute', Number(m));
  }
  static addMinutesToDate(date: Date, minutes = 5): Date {
    return new Date(moment(date).add(minutes, 'm').toDate());
  }
  static subtractMinutesFromDate(date: Date, minutes = 5): Date {
    return new Date(moment(date).subtract(minutes, 'm').toDate());
  }
  /**
   * converts gregorian date to jalali date
   * @param date
   * @param isFullDate
   */
  static gregorianToJalali = (
      date: string,
      isFullDate: boolean = false,
  ): string => {
    return momentj(date, DATE_TIME_FORMATTERS.serverDate).format(
        isFullDate
            ? DATE_TIME_FORMATTERS.jalaliFullDate
            : DATE_TIME_FORMATTERS.jalaliDate,
    );
  };
  static gregorianDateToJalali = (
      date: Date,
      isFullDate: boolean = false,
  ): string => {
    return momentj(moment(date)).format(
        isFullDate
            ? DATE_TIME_FORMATTERS.jalaliFullDate
            : DATE_TIME_FORMATTERS.jalaliDate,
    );
  };
  /**
   * converts jalali date to gregorian date
   * @param date
   */
  static jalaliToGregorian = (date: string) => {
    const formatter = momentj(date, DATE_TIME_FORMATTERS.jalaliDate);
    formatter.format(DATE_TIME_FORMATTERS.gregorianDate);
    return formatter;
  };

  /**
   * formats date by string or epoch
   * @param date
   * @param isJalali
   * @param gregorianFormatter
   * @param jalaliFormatter
   */
  static formatDate = (
      date: number | string,
      isJalali: boolean = false,
      gregorianFormatter: string = DATE_TIME_FORMATTERS.gregorianDate,
      jalaliFormatter: string = DATE_TIME_FORMATTERS.jalaliDate,
  ) => {
    if (typeof date === 'number') {
      return isJalali
          ? momentj.unix(date).format(jalaliFormatter)
          : moment.unix(date).format(gregorianFormatter);
    } else {
      return isJalali
          ? momentj(date, DATE_TIME_FORMATTERS.serverDate).format(jalaliFormatter)
          : moment(date).format(gregorianFormatter);
    }
  };

  /**
   * formats time by string or epoch
   * @param date
   * @param isUtc
   */
  static formatTime = (date: number | string, isUtc = true) => {
    if (typeof date === 'number') {
      return isUtc
          ? moment.unix(date).utc().format(DATE_TIME_FORMATTERS.time)
          : moment.unix(date).format(DATE_TIME_FORMATTERS.time);
    } else {
      return isUtc
          ? moment(date).utc().format(DATE_TIME_FORMATTERS.time)
          : moment(date).format(DATE_TIME_FORMATTERS.time);
    }
  };

  static getTime = (_date: INullableDate | string): string => {
    try {
      if (_date === null || _date === 'null') {
        return '';
      }
      const date = _date instanceof Date ? _date : new Date(_date);
      const hours = date?.getHours() ?? 0;
      const minutes = date?.getMinutes() ?? 0;
      return (
          (hours < 10 ? '0' + hours : hours) +
          ':' +
          (minutes < 10 ? '0' + minutes : minutes)
      );
    } catch (e) {
      return '';
    }
  };

  static convertSecondsToFormattedTime = (totalSeconds: number): string => {
    try {
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${leftPad(minutes, 2)}:${leftPad(seconds, 2)}`;
    } catch (e) {
      return '';
    }
  };

  /**
   * parse server date
   * @param date
   */
  static parseGregorianDate = (date: string) => {
    return moment(date).format(DATE_TIME_FORMATTERS.serverDate);
  };
  static getMonthNumByMonthName(monthName: string): number {
    return Number(moment().month(monthName).format('M') || 0);
  }
  static convertToYearMonthDay(date: Date): string {
    return moment(date).format(DATE_TIME_FORMATTERS.yearMonthDay);
  }
  static convertToDayMonth(date: moment.MomentInput): string {
    const _date = typeof date === 'number' ? date * 1000 : date;
    return moment(_date).format(DATE_TIME_FORMATTERS.monthNameDay);
  }
  static convertMonthDayToDate(monthDayString: string): INullableDate {
    let monthDay = monthDayString.split(' ');
    const [month, day] = monthDay;
    const date = new Date();
    date.setMonth(DateTimeFormatter.getMonthNumByMonthName(month) - 1);
    date.setDate(Number(day));
    return date;
    // return moment(monthDayString, DATE_TIME_FORMATTERS.monthNameDay).toDate();
  }
  static convertToDate(date: Date): string {
    return date?.toISOString()?.slice(0, 10);
  }
  static getFormerDay(date: moment.MomentInput): moment.Moment {
    const _date = typeof date === 'number' ? date * 1000 : date;
    return moment(_date).subtract(1, 'days');
  }
  static addDay(date: Date, days = 1): Date {
    return new Date(moment(date).add(days, 'd').toDate());
  }
  static subtractDay(date: Date, days = 1): Date {
    return new Date(moment(date).subtract(days, 'd').toDate());
  }

  /**
   * Checks whether given epochs are related to single day or not.
   * @param firstTimeStamp
   * @param secondTimeStamp
   */
  static isSameDay(
      firstTimeStamp: string | number,
      secondTimeStamp: string | number,
  ): boolean {
    if (
        typeof firstTimeStamp === 'string' &&
        typeof secondTimeStamp === 'string'
    ) {
      const timestamp1 = moment(
          firstTimeStamp,
          DATE_TIME_FORMATTERS.serverDate,
      ).unix();
      const timestamp2 = moment(
          secondTimeStamp,
          DATE_TIME_FORMATTERS.serverDate,
      ).unix();
      // NOTE: should use epoch in millisecond. (counts of second epoch = 9 | 10)
      const m1 = moment.parseZone(timestamp1 * 1000);
      const m2 = moment.parseZone(timestamp2 * 1000);
      return m1.isSame(m2, 'day');
    } else if (
        typeof firstTimeStamp === 'number' &&
        typeof secondTimeStamp === 'number'
    ) {
      // NOTE: should use epoch in millisecond. (counts of second epoch = 9 | 10)
      const m1 = moment.parseZone(firstTimeStamp * 1000);
      const m2 = moment.parseZone(secondTimeStamp * 1000);
      return m1.isSame(m2, 'day');
    }
  }
}
