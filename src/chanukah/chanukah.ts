// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import {
  type BasicJewishDate,
  calcDaysInMonth,
  toJewishDate,
} from "jewish-date";
import { isDateInHolidayList } from "../holiday";
import type { Holiday } from "../interfaces";
import { isBasicJewishDate } from "../jewishDateUtils";

const getChanukahList = (jewishYear: number): Holiday[] => {
  const result: Holiday[] = [
    { day: 25, monthName: "Kislev", name: "Chanukah" },
    { day: 26, monthName: "Kislev", name: "Chanukah" },
    { day: 27, monthName: "Kislev", name: "Chanukah" },
    { day: 28, monthName: "Kislev", name: "Chanukah" },
    { day: 29, monthName: "Kislev", name: "Chanukah" },
    { day: 30, monthName: "Kislev", name: "Chanukah" },
    { day: 1, monthName: "Tevet", name: "Chanukah" },
    { day: 2, monthName: "Tevet", name: "Chanukah" },
  ];
  if (calcDaysInMonth(jewishYear, "Kislev") === 29) {
    result.push({ day: 3, monthName: "Tevet", name: "Chanukah" });
  }
  return result;
};

/**
 *Determines whether a given date falls during Chanukah.
 *
 * Chanukah is an eight-day Jewish holiday that begins on the 25th of Kislev.
 * It commemorates the rededication of the Second Temple in Jerusalem and the miracle
 * of the oil that burned for eight days.
 *
 * @param date - The date to check, which can be either:
 *   - A Gregorian date object, or
 *   - An object representing a Jewish date with properties `day`, `monthName`, and `year`.
 *
 * @returns Returns `true` if the given date falls during Chanukah,
 *   and `false` otherwise.
 *
 * @example
 * const isChanukah = isChanukah(new Date(2024, 12, 25)); // true
 *
 * @public
 */
export const isChanukah = (date: Date | BasicJewishDate): boolean => {
  let jewishDate: BasicJewishDate;
  if (isBasicJewishDate(date)) {
    jewishDate = date;
  } else {
    jewishDate = toJewishDate(date);
  }

  const chanukahList = getChanukahList(jewishDate.year);
  return isDateInHolidayList(jewishDate, chanukahList);
};
