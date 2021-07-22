/**
 *
 * Custom utils for the timetable page
 *
 */

/**
 * Returns the next day of the of the week with reference to the date given
 * This will result in today if day is 1 today is Monday
 * @param {int} day
 * @param {Date} refDate
 * @return {Date}
 */
export function getNextDayOfTheWeek(day, refDate) {
  const resDate = new Date(refDate.getTime());
  resDate.setDate(
    refDate.getDate() + 1 + ((day + 7 - refDate.getDay() - 1) % 7),
  );
  return resDate;
}

export function getEleByKey(arr, key) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].key === key) {
      return arr[i].value;
    }
  }
  return {};
}
