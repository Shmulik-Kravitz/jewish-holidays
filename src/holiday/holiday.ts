// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, toJewishDate } from "jewish-date";
import type { Holiday } from "../interfaces";

/**
 * Returns every holiday in a holiday list that falls on a given Jewish date
 * @public
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
