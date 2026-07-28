// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, toJewishDate } from "jewish-date";
import type { Holiday, Language } from "../interfaces";

/**
 * Returns a holiday's name in the requested language.
 *
 * @param holiday - The holiday to name.
 * @param language - The language to name it in. Defaults to `"en"`.
 *
 * @returns The holiday's English or Hebrew name.
 *
 * @example
 * getHolidayName(\{ day: 9, monthName: "Av", name: "Tisha BeAv", hebrewName: "תשעה באב" \}, "he"); // "תשעה באב"
 *
 * @public
 */
export const getHolidayName = (
  holiday: Holiday,
  language: Language = "en",
): string => {
  return language === "he" ? holiday.hebrewName : holiday.name;
};

/**
 * Returns every holiday in a holiday list that falls on a given Jewish date
 * @internal
 */
export const getHolidaysForDate = (
  jewishDate: BasicJewishDate,
  holidayList: Holiday[],
): Holiday[] => {
  // If jewishDate is not defined, use today's date
  const effectiveJewishDate = jewishDate ?? toJewishDate(new Date());

  return holidayList.filter(
    (i) =>
      i.day === effectiveJewishDate.day &&
      i.monthName === effectiveJewishDate.monthName,
  );
};

/**
 * Checks if a given Jewish date exists in a holiday list
 * @public
 */
export const isDateInHolidayList = (
  jewishDate: BasicJewishDate,
  holidayList: Holiday[],
): boolean => {
  return getHolidaysForDate(jewishDate, holidayList).length > 0;
};
