// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, toJewishDate } from "jewish-date";
import { isChanukah } from "../chanukah";
import { isCholHaMoed } from "../cholHaMoed";
import { getHolidayName, getHolidaysForDate } from "../holiday";
import type { DateInfo, Language } from "../interfaces";
import { isBasicJewishDate } from "../jewishDateUtils";
import { getPurimList } from "../purim";
import { isRoshChodesh } from "../roshChodesh";
import { isErevShabbat, isShabbat } from "../shabbat";
import { getTzomInfo } from "../tzumot";
import { getYomTovList, isErevYomTov, isYomTov } from "../yomTov";

/**
 * The observances that have no holiday list of their own, and so carry their
 * label here rather than on a {@link Holiday} entry.
 */
const observanceLabels: Record<
  "cholHaMoed" | "roshChodesh" | "chanukah",
  Record<Language, string>
> = {
  cholHaMoed: { en: "Chol HaMoed", he: "חול המועד" },
  roshChodesh: { en: "Rosh Chodesh", he: "ראש חודש" },
  chanukah: { en: "Chanukah", he: "חנוכה" },
};

/**
 * Builds a complete summary of a given date in the Jewish calendar.
 *
 * This function accepts either a Gregorian date or a BasicJewishDate object,
 * normalizes it to a Jewish date, and aggregates every holiday/observance flag
 * the package can determine, along with the name(s) of any matched holiday and,
 * on a fast day, the specific fast and how it was shifted off Shabbat.
 *
 * @param date - The date to summarize, which can be either:
 *   - A Gregorian date object, or
 *   - An object representing a Jewish date with properties `day`, `monthName`, and `year`.
 * @param isChutzLaaretz - A boolean indicating whether to consider the holidays
 *   observed in Chutz Laaretz (the diaspora). Defaults to `false`, meaning it
 *   considers only Israeli holidays.
 * @param language - The language to report holiday and fast names in. Defaults
 *   to `"en"`.
 *
 * @returns A {@link DateInfo} object describing the date.
 *
 * @example
 * const info = getDateInfo(new Date(2024, 9, 3)); // Rosh Hashanah
 * console.log(info.isYomTov); // true
 * console.log(info.holidays); // ["Rosh Hashanah", "Rosh Chodesh"]
 *
 * const hebrew = getDateInfo(new Date(2024, 9, 3), false, "he");
 * console.log(hebrew.holidays); // ["ראש השנה", "ראש חודש"]
 *
 * @public
 */
export const getDateInfo = (
  date: Date | BasicJewishDate,
  isChutzLaaretz: boolean = false,
  language: Language = "en",
): DateInfo => {
  const jewishDate: BasicJewishDate = isBasicJewishDate(date)
    ? date
    : toJewishDate(date);

  const isCholHaMoedResult = isCholHaMoed(jewishDate, isChutzLaaretz);
  const isRoshChodeshResult = isRoshChodesh(jewishDate);
  const isChanukahResult = isChanukah(jewishDate);
  const tzom = getTzomInfo(jewishDate, language);

  const yomTovNames = getHolidaysForDate(
    jewishDate,
    getYomTovList(isChutzLaaretz),
  ).map((holiday) => getHolidayName(holiday, language));

  const purimNames = getHolidaysForDate(jewishDate, getPurimList()).map(
    (holiday) => getHolidayName(holiday, language),
  );

  // A date can carry several observances, but each is named only once - Yom
  // Kippur, for instance, is both a Yom Tov and a fast
  const holidays: string[] = [
    ...new Set([
      ...yomTovNames,
      ...(isCholHaMoedResult ? [observanceLabels.cholHaMoed[language]] : []),
      ...(isRoshChodeshResult ? [observanceLabels.roshChodesh[language]] : []),
      ...(isChanukahResult ? [observanceLabels.chanukah[language]] : []),
      ...purimNames,
      ...(tzom ? [tzom.name] : []),
    ]),
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
    isPurim: purimNames.length > 0,
    isTzom: tzom !== undefined,
    ...(tzom ? { tzom } : {}),
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
 * @param language - The language to report holiday and fast names in. Defaults
 *   to `"en"`.
 *
 * @returns A {@link DateInfo} object describing today's date.
 *
 * @example
 * const info = getTodayInfo();
 * console.log(info.isShabbat); // true or false
 *
 * @public
 */
export const getTodayInfo = (
  isChutzLaaretz: boolean = false,
  language: Language = "en",
): DateInfo => {
  return getDateInfo(new Date(), isChutzLaaretz, language);
};
