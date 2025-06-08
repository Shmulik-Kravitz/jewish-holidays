import { type BasicJewishDate, toJewishDate } from "jewish-date";
import { isDateInHolidayList } from "../holiday";
import type { Holiday } from "../interfaces";
import { isBasicJewishDate } from "../jewishDateUtils";

const getCholHaMoedIsrael = (): Holiday[] => {
  const result: Holiday[] = [
    { day: 16, monthName: "Tishri", name: "Chol HaMoed" },
    { day: 17, monthName: "Tishri", name: "Chol HaMoed" },
    { day: 18, monthName: "Tishri", name: "Chol HaMoed" },
    { day: 19, monthName: "Tishri", name: "Chol HaMoed" },
    { day: 20, monthName: "Tishri", name: "Chol HaMoed" },
    { day: 21, monthName: "Tishri", name: "Chol HaMoed" },

    { day: 16, monthName: "Nisan", name: "Chol HaMoed" },
    { day: 17, monthName: "Nisan", name: "Chol HaMoed" },
    { day: 18, monthName: "Nisan", name: "Chol HaMoed" },
    { day: 19, monthName: "Nisan", name: "Chol HaMoed" },
    { day: 20, monthName: "Nisan", name: "Chol HaMoed" },
  ];
  return result;
};

const getCholHaMoedChutzLaaretz = (): Holiday[] => {
  const result: Holiday[] = [
    { day: 17, monthName: "Tishri", name: "Chol HaMoed" },
    { day: 18, monthName: "Tishri", name: "Chol HaMoed" },
    { day: 19, monthName: "Tishri", name: "Chol HaMoed" },
    { day: 20, monthName: "Tishri", name: "Chol HaMoed" },
    { day: 21, monthName: "Tishri", name: "Chol HaMoed" },

    { day: 17, monthName: "Nisan", name: "Chol HaMoed" },
    { day: 18, monthName: "Nisan", name: "Chol HaMoed" },
    { day: 19, monthName: "Nisan", name: "Chol HaMoed" },
    { day: 20, monthName: "Nisan", name: "Chol HaMoed" },
  ];
  return result;
};

/**
 * Determines whether the given date falls within Chol HaMoed.
 *
 * Chol HaMoed refers to the intermediate days of Passover and Sukkot,
 * which are considered semi-festive days. This function can handle both
 * Gregorian dates and basic Jewish dates.
 *
 * @param date - The date to check, which can be a JavaScript Date object
 *               or a BasicJewishDate.
 * @param isChutzLaaretz - A boolean indicating whether the date is in
 *                         the diaspora (false for Israel). Defaults to false.
 *
 * @returns A boolean indicating whether the specified date is during
 *          Chol HaMoed.
 * @public
 */
export const isCholHaMoed = (
  date: Date | BasicJewishDate,
  isChutzLaaretz: boolean = false,
): boolean => {
  let jewishDate: BasicJewishDate;
  if (isBasicJewishDate(date)) {
    jewishDate = date;
  } else {
    jewishDate = toJewishDate(date);
  }

  const cholHaMoed = isChutzLaaretz
    ? getCholHaMoedChutzLaaretz()
    : getCholHaMoedIsrael();
  return isDateInHolidayList(jewishDate, cholHaMoed);
};
