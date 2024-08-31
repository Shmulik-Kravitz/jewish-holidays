// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { BasicJewishDate, toJewishDate } from "jewish-date";
import type { Holiday } from "../interfaces";
import { isHoliday } from "../holiday";
import { isBasicJewishDate } from "../jewishDateUtils/jewishDateUtils";

const getYomTovListIsrael = (): Holiday[] => {
    const result: Holiday[] = [
        { day: 1, monthName: "Tishri", name: 'Rosh Hashanah' },
        { day: 2, monthName: "Tishri", name: 'Rosh Hashanah' },
        { day: 10, monthName: "Tishri", name: 'Yom Kippur' },
        { day: 15, monthName: "Tishri", name: 'Sukkot' },
        { day: 24, monthName: "Tishri", name: 'Sukkot' },

        { day: 15, monthName: "Nisan", name: 'Pesach' },
        { day: 21, monthName: "Nisan", name: 'Shevii Shel Pesach' },

        { day: 6, monthName: "Sivan", name: 'Shavuot' },

    ];
    return result;
};

const getYomTovListChutzLaaretzOnly = (): Holiday[] => {
    const result: Holiday[] = [
        { day: 16, monthName: "Tishri", name: 'Sukkot' },
        { day: 23, monthName: "Tishri", name: 'Simchat Torah' },

        { day: 16, monthName: "Nisan", name: 'Pesach' },
        { day: 22, monthName: "Nisan", name: 'Pesach Shel Pesach' },

        { day: 7, monthName: "Sivan", name: 'Shavuot' },
    ];
    return result;
};

/**
 * Determines if a given date is a Yom Tov (Jewish holiday).
 *
 * This function accepts either a Gregorian date or a BasicJewishDate object
 * and checks if it corresponds to a Yom Tov in either Israel or Chutz Laaretz (the diaspora).
 *
 * @param  date - The date to check, which can be either:
 *   - A Gregorian date object, or
 *   - An object representing a Jewish date with properties `day`, `monthName`, and `year`.
 * @param isChutzLaaretz - A boolean indicating whether to check against Yom Tov dates
 *   observed in Chutz Laaretz. Defaults to `false`, meaning it checks only for Israeli holidays.
 *
 * @returns  Returns `true` if the given date is a Yom Tov, 
 *   and `false` otherwise.
 *
 * @example
 * const isRoshHashanah = isYomTov(new Date(2024, 9, 3)); // true
 * const isSukkotInChutzLaaretz = isYomTov(\{ day: 16, monthName: "Tishri", year: 5785 \}, true); // true
 * 
 * @public
 */
export const isYomTov = (date: Date | BasicJewishDate, isChutzLaaretz: boolean = false): boolean => {
    let jewishDate: BasicJewishDate;
    if (isBasicJewishDate(date)) {
        jewishDate = date;
    } else {
        jewishDate = toJewishDate(date);
        
    }
    const yomTovList: Holiday[] = [...getYomTovListIsrael(), ...(isChutzLaaretz ? getYomTovListChutzLaaretzOnly() : [])]

    return isHoliday(jewishDate, yomTovList)
};