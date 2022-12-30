/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return new Date(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return new Date(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  if (new Date(date).getFullYear() % 100 === 0) {
    if (new Date(date).getFullYear() % 400 === 0) {
      return true;
    }
    return false;
  }
  return new Date(date).getFullYear() % 4 === 0;
}


/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  const dif = Math.abs(new Date((endDate - startDate)));
  let hours = Math.floor(dif / 3600000).toString();
  if (hours.length < 2) { hours = `0${hours}`; }
  let minutes = Math.abs(Math.floor((dif - hours * 3600000) / 60000)).toString();
  if (minutes.length < 2) { minutes = `0${minutes}`; }
  let secs = Math.abs(Math.floor((dif - hours * 3600000 - minutes * 60000) / 1000)).toString();
  if (secs.length < 2) { secs = `0${secs}`; }
  let mlsecs = `${Math.abs(Math.floor((dif - hours * 3600000 - minutes * 60000 - secs * 1000)))}`;
  if (mlsecs.length < 2) {
    mlsecs = `00${mlsecs}`;
  }
  if (mlsecs.length < 3) {
    mlsecs = `0${mlsecs}`;
  }
  return `${hours}:${minutes}:${secs}.${mlsecs}`;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  const newdate = new Date(date);
  const hours = newdate.getUTCHours() > 12 ? newdate.getUTCHours() - 12 : newdate.getUTCHours();
  const minutes = newdate.getUTCMinutes();
  const shiftH = minutes / 2;
  const shiftM = minutes * 6;
  const hzH = hours * 30;
  let result;
  if (shiftM > hzH) {
    result = shiftM - hzH - shiftH;
  } else {
    result = hzH - shiftM + shiftH;
  }
  if (result > 180) {
    return (360 - result) * (Math.PI / 180);
  }
  if (result === 180) {
    return Math.PI;
  }

  return (result * Math.PI) / 180;
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
