// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, JewishMonth, toJewishDate } from "jewish-date";
import { isDateInHolidayList } from "../holiday";
import type { Holiday } from "../interfaces";
import { isBasicJewishDate } from "../jewishDateUtils";

const getPurimList = (): Holiday[] => {
  return [
    { day: 14, monthName: JewishMonth.Adar, name: "Purim" },
    { day: 15, monthName: JewishMonth.Adar, name: "Shushan Purim" },
    { day: 14, monthName: JewishMonth.AdarII, name: "Purim" },
    { day: 15, monthName: JewishMonth.AdarII, name: "Shushan Purim" },
  ];
};

/**
 * Determines whether a given date falls on Purim.
 *
 * Purim is a Jewish holiday celebrated on the 14th of Adar, with Shushan Purim on the 15th of Adar.
 * The holiday commemorates the salvation of the Jewish people from Haman's plot in ancient Persia.
 *
 * @param date - The date to check, which can be either:
 *   - A Gregorian date object (Date), or
 *   - An object representing a Jewish date with properties `day`, `monthName`, and `year`.
 *
 * @returns Returns `true` if the given date falls on Purim or Shushan Purim,
 *   and `false` otherwise.
 *
 * @example
 * const isPurimToday = isPurim(new Date(2024, 2, 24)); // true
 *
 * @public
 */
export const isPurim = (date: Date | BasicJewishDate): boolean => {
  let jewishDate: BasicJewishDate;
  if (isBasicJewishDate(date)) {
    jewishDate = date;
  } else {
    jewishDate = toJewishDate(date);
  }

  const purimList = getPurimList();
  return isDateInHolidayList(jewishDate, purimList);
};
