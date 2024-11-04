// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, toJewishDate } from "jewish-date";
import type { Holiday } from "../interfaces";

/**
 * Return if the date exists in holyday list
 * @public
 */
export const isHoliday = (
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
