// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { type BasicJewishDate, JewishMonth, toJewishDate } from "jewish-date";
import { getHolidayName } from "../holiday";
import type { Language, Tzom, TzomInfo } from "../interfaces";
import { isBasicJewishDate } from "../jewishDateUtils";
import { isShabbat } from "../shabbat";

/**
 * Returns the list of Jewish fast days (Tzomot), each with the rule that applies
 * when its calendar date falls on Shabbat.
 *
 * @returns The list of fast days.
 *
 * @example
 * const fasts = getTzomotList();
 * console.log(fasts[0]); // \{ day: 3, monthName: "Tishri", name: "Tzom Gdalia", shiftOnShabbat: "postponed" \}
 *
 * @public
 */
export const getTzomotList = (): Tzom[] => {
  return [
    {
      day: 3,
      monthName: JewishMonth.Tishri,
      name: "Tzom Gdalia",
      hebrewName: "צום גדליה",
      shiftOnShabbat: "postponed",
    },
    // Yom Kippur is fasted even when it falls on Shabbat
    {
      day: 10,
      monthName: JewishMonth.Tishri,
      name: "Yom Kippur",
      hebrewName: "יום הכיפורים",
      shiftOnShabbat: null,
    },
    // Asara BeTevet can fall on Friday but never on Shabbat
    {
      day: 10,
      monthName: JewishMonth.Tevet,
      name: "Asara BeTevet",
      hebrewName: "עשרה בטבת",
      shiftOnShabbat: null,
    },
    // The Sunday after 13 Adar is Purim itself, so the fast moves back to Thursday
    {
      day: 13,
      monthName: JewishMonth.Adar,
      name: "Taanit Esther",
      hebrewName: "תענית אסתר",
      shiftOnShabbat: "advanced",
    },
    {
      day: 13,
      monthName: JewishMonth.AdarII,
      name: "Taanit Esther",
      hebrewName: "תענית אסתר",
      shiftOnShabbat: "advanced",
    },
    // 14 Nisan is Erev Pesach, so the fast moves back to Thursday
    {
      day: 14,
      monthName: JewishMonth.Nisan,
      name: "Taanit Bechorot",
      hebrewName: "תענית בכורות",
      shiftOnShabbat: "advanced",
    },
    {
      day: 17,
      monthName: JewishMonth.Tammuz,
      name: "Shiva Asar BeTamuz",
      hebrewName: "שבעה עשר בתמוז",
      shiftOnShabbat: "postponed",
    },
    {
      day: 9,
      monthName: JewishMonth.Av,
      name: "Tisha BeAv",
      hebrewName: "תשעה באב",
      shiftOnShabbat: "postponed",
    },
  ];
};

/**
 * Returns the day of the month on which a fast is actually observed in a given
 * Jewish year. Every shift stays inside the fast's own month.
 */
const getObservedDay = (tzom: Tzom, year: number): number => {
  if (tzom.shiftOnShabbat === null) {
    return tzom.day;
  }
  if (!isShabbat({ day: tzom.day, monthName: tzom.monthName, year })) {
    return tzom.day;
  }
  return tzom.shiftOnShabbat === "postponed" ? tzom.day + 1 : tzom.day - 2;
};

/**
 * Returns the fast day observed on a given date, if any.
 *
 * A fast whose calendar date falls on Shabbat is either postponed to the Sunday
 * (Tzom Gdalia, Shiva Asar BeTamuz, Tisha BeAv) or advanced to the preceding
 * Thursday (Taanit Esther, Taanit Bechorot); Yom Kippur is fasted on Shabbat
 * itself. The returned `shift` says which of those brought the fast to this date.
 *
 * @param date - The date to check, which can be either:
 *   - A Gregorian date object (Date), or
 *   - An object representing a Jewish date with properties `day`, `monthName`, and `year`
 * @param language - The language to name the fast in. Defaults to `"en"`.
 *
 * @returns A {@link TzomInfo} describing the fast, or `undefined` when the date
 *   is not a fast day.
 *
 * @example
 * getTzomInfo(new Date(2029, 6, 22)); // \{ name: "Tisha BeAv", shift: "postponed" \}
 * getTzomInfo(new Date(2024, 2, 21)); // \{ name: "Taanit Esther", shift: "advanced" \}
 * getTzomInfo(new Date(2025, 2, 13)); // \{ name: "Taanit Esther", shift: null \}
 * getTzomInfo(new Date(2029, 6, 22), "he"); // \{ name: "תשעה באב", shift: "postponed" \}
 *
 * @public
 */
export const getTzomInfo = (
  date: Date | BasicJewishDate,
  language: Language = "en",
): TzomInfo | undefined => {
  let jewishDate: BasicJewishDate;
  if (isBasicJewishDate(date)) {
    jewishDate = date;
  } else {
    jewishDate = toJewishDate(date);
  }

  for (const tzom of getTzomotList()) {
    if (tzom.monthName !== jewishDate.monthName) {
      continue;
    }
    const observedDay = getObservedDay(tzom, jewishDate.year);
    if (observedDay !== jewishDate.day) {
      continue;
    }
    return {
      name: getHolidayName(tzom, language),
      shift: observedDay === tzom.day ? null : tzom.shiftOnShabbat,
    };
  }

  return undefined;
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
 * A fast that falls on Shabbat is observed on another day, so this returns
 * `false` for the Shabbat and `true` for the day it moved to. See
 * {@link getTzomInfo} for the name of the fast and the direction of the shift.
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
  return getTzomInfo(date) !== undefined;
};
