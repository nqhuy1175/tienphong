/**
 * Class that handles Date and Time related operations.
 */
import moment, {MomentInput} from 'moment';

moment.locale('vi');

// format time full theo chuan vietnam
export function getFullDateTimeFormat() {
  return 'DD/MM/YYYY HH:mm:ss';
}

// format date theo chuan vietnam
export function getDateFormat() {
  return 'DD/MM/YYYY';
}

// format date theo chuan vietnam (dd/mm(text)/yyyy)
export function getDateFormatMMText() {
  return 'DD MMM YYYY';
}

// format time theo chuan vietnam
export function getTimeFormat() {
  return 'HH:mm:ss';
}

// format time full to file
export function getFullFileSaverDateTimeFormat() {
  return 'YYMMDD_HHmmss';
}

// format time
export function format(date: number, timeFormat: string) {
  return moment(date).format(timeFormat);
}

// truyen vao datetime, tra ra la 1 so tu 0-6
export function getdayOfWeek(date: Date) {
  return moment(date).day();
}

// neu time1 > time2 => 1
// neu time1 = time2 => 0
// neu time1 < time2 => -1
export function compareDateTime(time1: Date, time2: Date) {
  if (moment(time1).isSame(time2)) {
    return 0;
  }
  if (moment(time1).isBefore(time2)) {
    return -1;
  }
  return 1;
}

// neu time1 > time2 => 1
// neu time1 = time2 => 0
// neu time1 < time2 => -1
export function compareDate(time1: any, time2: any) {
  const change = moment(time1).diff(moment(time2), 'days');
  if (change < 0) return -1;
  if (change > 0) return 1;
  return 0;
}

// convert string 'DD/MM/YYYY' to date.
export function convertToDate(datetimeString: string) {
  try {
    return moment(datetimeString, [
      getFullDateTimeFormat(),
      getDateFormat(),
      getFullFileSaverDateTimeFormat(),
      moment.ISO_8601
    ])
      .startOf('day')
      .toDate();
  } catch (e) {
    console.error(e);
  }
  return null;
}

// chuyen ve gio local
export function convertToLocalTime(utcTime: MomentInput) {
  return moment.utc(utcTime).local().toDate();
}

// xk
// tra ve string date MM(text)
export function getDateStringMMText(input: MomentInput) {
  if (input == null) return input;
  if (typeof input === 'string') {
    // neu la string thi convert theo format
    return moment(input, [
      getFullDateTimeFormat(),
      getDateFormatMMText(),
      getFullFileSaverDateTimeFormat(),
      moment.ISO_8601
    ]).format(getDateFormatMMText());
  }
  // neu khac thi de moment tu convert
  return moment(input).format(getDateFormatMMText());
}

// tra ve string date
export function getDateString(input: MomentInput) {
  if (input == null) return input;
  if (typeof input === 'string') {
    // neu la string thi convert theo format
    return moment(input, [
      getFullDateTimeFormat(),
      getDateFormat(),
      getFullFileSaverDateTimeFormat(),
      moment.ISO_8601
    ]).format(getDateFormat());
  }
  // neu khac thi de moment tu convert
  return moment(input).format(getDateFormat());
}

// tra ve string date
export function getDateStringWithFormat(
  input: MomentInput,
  dateFormat: string
) {
  if (input == null) return input;
  return moment(input).format(dateFormat);
  // if (typeof input === 'string') {
  //     // neu la string thi convert theo format
  //     return moment(input,
  //         [getFullDateTimeFormat(), getDateFormat(), getFullFileSaverDateTimeFormat(), moment.ISO_8601])
  //         .format(format());
  // } else {
  //     // neu khac thi de moment tu convert

  // }
}

// tra ve string time
export function getTimeString(input: MomentInput, formatTime: string) {
  if (input == null) return input;

  if (formatTime != null) {
    if (typeof input === 'string') {
      // neu la string thi convert theo format
      return moment(input, formatTime).format(formatTime);
    }
    return moment(input).format(formatTime);
  }
  if (typeof input === 'string') {
    // neu la string thi convert theo format
    return moment(input, getTimeFormat()).format(getTimeFormat());
  }
  return moment(input).format(getTimeFormat());
}

// tra ve string date time
export function getDateTimeFullString(input: MomentInput): any {
  if (input == null) return input;
  if (typeof input === 'string') {
    // neu la string thi convert theo format
    return moment(input, [
      getFullDateTimeFormat(),
      getDateFormat(),
      getFullFileSaverDateTimeFormat(),
      moment.ISO_8601
    ]).format(getFullDateTimeFormat());
  }
  // neu khac thi de moment tu convert
  return moment(input).format(getFullDateTimeFormat());
}

// chuyen Timestamp tra ve obj gio phut giay
export function convertTimeStampToToDayObjTime(input: number) {
  let result: {};

  const date = new Date(input * 1000);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  result = {
    h: hours,
    m: minutes.substr(-2),
    s: seconds.substr(-2)
  };
  return result;
}

const listMonth = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export function getMonthBetween(d1: number, d2: number) {
  const date1 = moment(d1, 'DD/MM/YYYY');
  const date2 = moment(d2, 'DD/MM/YYYY');
  const diff = date2.diff(date1, 'months');
  const listTime = [];
  for (let i = 0; i <= diff; i++) {
    const m = date1.month();
    let tmp = m + i;
    let y = date1.year();
    if (tmp > 11) {
      tmp -= 12;
      y += 1;
    }
    listTime.push(`${listMonth[tmp]} ${y}`);
  }
  return listTime;
}
