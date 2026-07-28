import {
  type BasicJewishDate,
  type JewishMonthType,
  toJewishDate,
} from "jewish-date";
import { isDateInHolidayList } from "../holiday";
import type { Holiday } from "../interfaces";
import { isBasicJewishDate } from "../jewishDateUtils";

const cholHaMoedDays = (
  monthName: JewishMonthType,
  days: number[],
): Holiday[] => {
  return days.map((day) => ({
    day,
    monthName,
    name: "Chol HaMoed",
    hebrewName: "חול המועד",
  }));
};

const getCholHaMoedIsrael = (): Holiday[] => {
  const result: Holiday[] = [
    ...cholHaMoedDays("Tishri", [16, 17, 18, 19, 20, 21]),
    ...cholHaMoedDays("Nisan", [16, 17, 18, 19, 20]),
  ];
  return result;
};

const getCholHaMoedChutzLaaretz = (): Holiday[] => {
  const result: Holiday[] = [
    ...cholHaMoedDays("Tishri", [17, 18, 19, 20, 21]),
    ...cholHaMoedDays("Nisan", [17, 18, 19, 20]),
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
