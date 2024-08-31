import { BasicJewishDate, toGregorianDate } from "jewish-date";
import { isBasicJewishDate } from "../jewishDateUtils";

/**
 * Checks if a given date is Shabbat (the Jewish Sabbath).
 *
 * @param date - The date to check, which can be a JavaScript `Date` object
 *               or a `BasicJewishDate` object.
 * 
 * @returns A boolean indicating whether the provided date falls on Shabbat.
 *
 * @remarks
 * Shabbat begins at sundown on Friday and ends at nightfall on Saturday.
 * In the Gregorian calendar, Shabbat corresponds to Saturday, which is
 * represented by `getDay() === 6`.
 * 
 * @example
 * // Example: Check if a specific date is Shabbat
 * const date = new Date('2023-10-21'); // Saturday
 * const result = isShabbat(date); // true
 *
 * @public
 */

export const isShabbat = (date: Date | BasicJewishDate): boolean => {
    let gregorianDate: Date;
    if (isBasicJewishDate(date)) {
        gregorianDate = toGregorianDate(date);
    } else {
        gregorianDate = date;
    }
    return gregorianDate.getDay() === 6;
}