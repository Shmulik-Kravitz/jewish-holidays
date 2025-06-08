import { type BasicJewishDate, toJewishDate } from "jewish-date";
import { isBasicJewishDate } from "../jewishDateUtils";

/**
 * Determines whether a given date is Rosh Chodesh (the beginning of a new Jewish month).
 *
 * @param date - The date to check, which can be either:
 *   - A Gregorian date object (Date), or
 *   - An object representing a Jewish date with properties `day`, `monthName`, and `year`
 *
 * @returns Returns `true` if the given date is Rosh Chodesh, `false` otherwise
 *
 * @public
 */
export const isRoshChodesh = (date: Date | BasicJewishDate): boolean => {
  let jewishDate: BasicJewishDate;
  if (isBasicJewishDate(date)) {
    jewishDate = date;
  } else {
    jewishDate = toJewishDate(date);
  }

  return jewishDate.day === 1 || jewishDate.day === 30;
};
