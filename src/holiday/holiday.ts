// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, toJewishDate } from "jewish-date";
import type { Holiday } from "../interfaces";

/**
 * Checks if a given Jewish date exists in a holiday list
 * @public
 */
export const isDateInHolidayList = (
  jewishDate: BasicJewishDate,
  holidayList: Holiday[],
): boolean => {
  // If jewishDate is not defined, use today's date
  const effectiveJewishDate = jewishDate ?? toJewishDate(new Date());

  return holidayList.some(
    (i) =>
      i.day === effectiveJewishDate.day &&
      i.monthName === effectiveJewishDate.monthName,
  );
};
