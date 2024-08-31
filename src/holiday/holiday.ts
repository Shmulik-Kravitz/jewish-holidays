// Copyright (c) Shmulik kravitz. All rights reserved. Licensed under the MIT license.

import { toJewishDate, type BasicJewishDate } from 'jewish-date';
import { Holiday } from '../interfaces';

/**
 * Return if the date exists in holyday list
 * @public
 */
export const isHoliday = (jewishDate: BasicJewishDate, holidayList: Holiday[]): boolean => {
    // if jewishDate is not defined use today
    if (!jewishDate) {
        const date = new Date();
        jewishDate = toJewishDate(date);
    }
    return holidayList.some(i => i.day == jewishDate.day && i.monthName == jewishDate.monthName);
};