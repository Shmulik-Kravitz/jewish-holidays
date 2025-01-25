// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, toJewishDate } from "jewish-date";
import { isHoliday } from "../holiday";
import type { Holiday } from "../interfaces";
import { isBasicJewishDate } from "../jewishDateUtils/jewishDateUtils";

const getErevYomTovList = (): Holiday[] => {
  const result: Holiday[] = [
    { day: 29, monthName: "Elul", name: "Erev Rosh Hashanah" },
    { day: 9, monthName: "Tishri", name: "Erev Yom Kippur" },
    { day: 14, monthName: "Tishri", name: "Erev Sukkot" },
    { day: 21, monthName: "Tishri", name: "Erev Simchat Torah" },

    { day: 14, monthName: "Nisan", name: "Erev Pesach" },
    { day: 20, monthName: "Nisan", name: "Erev Shvi'i Shel Pesach" },

    { day: 5, monthName: "Sivan", name: "Erev Shavuot" },
  ];
  return result;
};

/**
 * DDetermines whether a given date is a Erev Yom Tov (the day before a Jewish holiday).
 *
 * This function accepts either a Gregorian date or a BasicJewishDate object
 * and checks if it corresponds to a Erev Yom Tov
 *
 * @param  date - The date to check, which can be either:
 *   - A Gregorian date object, or
 *   - An object representing a Jewish date with properties `day`, `monthName`, and `year`.
 * @returns  Returns `true` if the given date is a Yom Tov,
 *   and `false` otherwise.
 *
 * @example
 * const isRoshHashanah = isYomTov(new Date(2024, 9, 3)); // true
 * const isSukkotInChutzLaaretz = isYomTov(\{ day: 16, monthName: "Tishri", year: 5785 \}); // true
 *
 * @public
 */
export const isErevYomTov = (date: Date | BasicJewishDate): boolean => {
  let jewishDate: BasicJewishDate;
  if (isBasicJewishDate(date)) {
    jewishDate = date;
  } else {
    jewishDate = toJewishDate(date);
  }
  const yomTovList: Holiday[] = [...getErevYomTovList()];

  return isHoliday(jewishDate, yomTovList);
};
