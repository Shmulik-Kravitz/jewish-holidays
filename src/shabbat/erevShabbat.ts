import { type BasicJewishDate, toGregorianDate } from "jewish-date";
import { isBasicJewishDate } from "../jewishDateUtils";

/**
 * Checks if the given date is Erev Shabbat (the day before Shabbat).
 *
 * @param date - The date to check, which can be a JavaScript Date object
 *               or a BasicJewishDate.
 * @returns A boolean indicating whether the specified date is Erev Shabbat.
 *
 * @public
 */
export const isErevShabbat = (date: Date | BasicJewishDate): boolean => {
  let gregorianDate: Date;
  if (isBasicJewishDate(date)) {
    gregorianDate = toGregorianDate(date);
  } else {
    gregorianDate = date;
  }
  return gregorianDate.getDay() === 5;
};
