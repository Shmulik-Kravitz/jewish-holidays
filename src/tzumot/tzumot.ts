// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, JewishMonth, toJewishDate } from "jewish-date";
import { isDateInHolidayList } from "../holiday";
import type { Holiday } from "../interfaces";
import { isBasicJewishDate } from "../jewishDateUtils";
import { isShabbat } from "../shabbat";

const getTzomotList = (): Holiday[] => {
  return [
    { day: 3, monthName: JewishMonth.Tishri, name: "Tzom Gdalia" },
    { day: 10, monthName: JewishMonth.Tishri, name: "Yom Kippur" },
    { day: 10, monthName: JewishMonth.Tevet, name: "Asara BeTevet" },
    { day: 13, monthName: JewishMonth.Adar, name: "Taanit Esther" },
    { day: 13, monthName: JewishMonth.AdarII, name: "Taanit Esther" },
    { day: 14, monthName: JewishMonth.Nisan, name: "Taanit Bechorot" },
    { day: 17, monthName: JewishMonth.Tammuz, name: "Shiva Asar BeTamuz" },
    { day: 9, monthName: JewishMonth.Av, name: "Tisha BeAv" },
  ];
};


const shouldDelayFast = (jewishDate: BasicJewishDate): boolean => {
  // These fasts are delayed when they fall on Shabbat
  const delayableFasts: Holiday[] = [
    { day: 17, monthName: JewishMonth.Tammuz, name: "Shiva Asar BeTamuz (delayed)" },
    { day: 9, monthName: JewishMonth.Av, name: "Tisha BeAv (delayed)" },
    { day: 13, monthName: JewishMonth.Adar, name: "Taanit Esther (delayed)" },
    { day: 13, monthName: JewishMonth.AdarII, name: "Taanit Esther (delayed)" },
    { day: 3, monthName: JewishMonth.Tishri, name: "Tzom Gdalia (delayed)" },
  ];
  // Check if the date is a Shabbat and if the fast is one that can be delayed
  return (
    isShabbat(jewishDate) &&
    delayableFasts.some(
      (fast) => fast.day === jewishDate.day && fast.monthName === jewishDate.monthName
    )
  );
};

/**
 * Determines whether a given date falls on any Jewish fast day (Tzom).
 *
 * The Jewish fast days include:
 * - Tzom Gdalia (3rd of Tishri)
 * - Yom Kippur (10th of Tishri)
 * - Asara BeTevet (10th of Tevet)
 * - Taanit Esther (13th of Adar)
 * - Taanit Bechorot (14th of Nisan)
 * - Shiva Asar BeTamuz (17th of Tammuz)
 * - Tisha BeAv (9th of Av)
 *
 * @param date - The date to check, which can be either:
 *   - A Gregorian date object (Date), or
 *   - An object representing a Jewish date with properties `day`, `monthName`, and `year`
 *
 * @returns Returns `true` if the given date falls on any fast day, `false` otherwise
 *
 * @public
 */
export const isTzom = (date: Date | BasicJewishDate): boolean => {
  let jewishDate: BasicJewishDate;
  if (isBasicJewishDate(date)) {
    jewishDate = date;
  } else {
    jewishDate = toJewishDate(date);
  }

  const tzomotList = getTzomotList();
  
  // Check if it's a regular fast day
  if (isDateInHolidayList(jewishDate, tzomotList) && (!isShabbat(jewishDate) || !shouldDelayFast(jewishDate))) {
    return true;
  }

  // Check if yesterday's fast was delayed to today
  const previousDay = { ...jewishDate, day: jewishDate.day - 1 };
  return shouldDelayFast(previousDay);
};
