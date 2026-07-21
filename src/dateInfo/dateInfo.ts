// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, toJewishDate } from "jewish-date";
import { isChanukah } from "../chanukah";
import { isCholHaMoed } from "../cholHaMoed";
import { getHolidaysForDate } from "../holiday";
import type { DateInfo } from "../interfaces";
import { isBasicJewishDate } from "../jewishDateUtils";
import { isPurim } from "../purim";
import { isRoshChodesh } from "../roshChodesh";
import { isErevShabbat, isShabbat } from "../shabbat";
import { isTzom } from "../tzumot";
import { getYomTovList, isErevYomTov, isYomTov } from "../yomTov";

/**
 * Builds a complete summary of a given date in the Jewish calendar.
 *
 * This function accepts either a Gregorian date or a BasicJewishDate object,
 * normalizes it to a Jewish date, and aggregates every holiday/observance flag
 * the package can determine, along with the name(s) of any matched holiday.
 *
 * @param date - The date to summarize, which can be either:
 *   - A Gregorian date object, or
 *   - An object representing a Jewish date with properties `day`, `monthName`, and `year`.
 * @param isChutzLaaretz - A boolean indicating whether to consider the holidays
 *   observed in Chutz Laaretz (the diaspora). Defaults to `false`, meaning it
 *   considers only Israeli holidays.
 *
 * @returns A {@link DateInfo} object describing the date.
 *
 * @example
 * const info = getDateInfo(new Date(2024, 9, 3)); // Rosh Hashanah
 * console.log(info.isYomTov); // true
 * console.log(info.holidays); // ["Rosh Hashanah", "Rosh Chodesh"]
 *
 * @public
 */
export const getDateInfo = (
  date: Date | BasicJewishDate,
  isChutzLaaretz: boolean = false,
): DateInfo => {
  const jewishDate: BasicJewishDate = isBasicJewishDate(date)
    ? date
    : toJewishDate(date);

  const isCholHaMoedResult = isCholHaMoed(jewishDate, isChutzLaaretz);
  const isRoshChodeshResult = isRoshChodesh(jewishDate);
  const isChanukahResult = isChanukah(jewishDate);
  const isPurimResult = isPurim(jewishDate);
  const isTzomResult = isTzom(jewishDate);

  const yomTovNames = getHolidaysForDate(
    jewishDate,
    getYomTovList(isChutzLaaretz),
  ).map((holiday) => holiday.name);

  const holidays: string[] = [
    ...yomTovNames,
    ...(isCholHaMoedResult ? ["Chol HaMoed"] : []),
    ...(isRoshChodeshResult ? ["Rosh Chodesh"] : []),
    ...(isChanukahResult ? ["Chanukah"] : []),
    ...(isPurimResult ? ["Purim"] : []),
    ...(isTzomResult ? ["Tzom"] : []),
  ];

  return {
    jewishDate,
    isYomTov: isYomTov(jewishDate, isChutzLaaretz),
    isErevYomTov: isErevYomTov(jewishDate),
    isCholHaMoed: isCholHaMoedResult,
    isShabbat: isShabbat(jewishDate),
    isErevShabbat: isErevShabbat(jewishDate),
    isRoshChodesh: isRoshChodeshResult,
    isChanukah: isChanukahResult,
    isPurim: isPurimResult,
    isTzom: isTzomResult,
    holidays,
  };
};

/**
 * Builds a complete summary of today's date in the Jewish calendar.
 *
 * This is a thin convenience wrapper around {@link getDateInfo} that uses the
 * current date (`new Date()`).
 *
 * @param isChutzLaaretz - A boolean indicating whether to consider the holidays
 *   observed in Chutz Laaretz (the diaspora). Defaults to `false`, meaning it
 *   considers only Israeli holidays.
 *
 * @returns A {@link DateInfo} object describing today's date.
 *
 * @example
 * const info = getTodayInfo();
 * console.log(info.isShabbat); // true or false
 *
 * @public
 */
export const getTodayInfo = (isChutzLaaretz: boolean = false): DateInfo => {
  return getDateInfo(new Date(), isChutzLaaretz);
};
