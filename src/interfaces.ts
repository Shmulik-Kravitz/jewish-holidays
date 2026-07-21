import type { BasicJewishDate, JewishMonthType } from "jewish-date";

/**
 * Represents a Jewish holiday.
 * @public
 */
export interface Holiday {
  /**
   * The day of the month on which the holiday occurs.
   *
   * @remarks
   * This value should be a number between 1 and 30, depending on the month.
   *
   * @example
   * // Example: 15th of the month
   * const holiday: Holiday = \{ day: 15, monthName: "Nisan", name: "Passover" \};
   */
  day: number;

  /**
   * The name of the month in which the holiday falls.
   *
   * @remarks
   * This should be of type `JewishMonthType`, representing the specific month in the Jewish calendar.
   *
   * @example
   * // Example: Nisan
   * const holiday: Holiday = \{ day: 15, monthName: "Nisan", name: "Passover" \};
   */
  monthName: JewishMonthType;

  /**
   * The official name of the holiday.
   *
   * @remarks
   * This should be a string representing the name of the holiday, such as "Passover" or "Rosh Hashanah".
   *
   * @example
   * // Example: "Passover"
   * const holiday: Holiday = \{ day: 15, monthName: "Nisan", name: "Passover" \};
   */
  name: string;
}

/**
 * Represents a complete summary of a single date in the Jewish calendar.
 *
 * @remarks
 * This is the aggregated result returned by `getDateInfo` and `getTodayInfo`.
 * It combines the normalized Jewish date with every holiday/observance flag the
 * package can determine, plus the name(s) of any matched Yom Tov.
 *
 * @public
 */
export interface DateInfo {
  /**
   * The date, normalized to the Jewish calendar.
   */
  jewishDate: BasicJewishDate;

  /**
   * Whether the date is a Yom Tov (Jewish holiday).
   */
  isYomTov: boolean;

  /**
   * Whether the date is Erev Yom Tov (the day before a Yom Tov).
   */
  isErevYomTov: boolean;

  /**
   * Whether the date is Chol HaMoed (the intermediate days of Pesach or Sukkot).
   */
  isCholHaMoed: boolean;

  /**
   * Whether the date is Shabbat.
   */
  isShabbat: boolean;

  /**
   * Whether the date is Erev Shabbat (Friday).
   */
  isErevShabbat: boolean;

  /**
   * Whether the date is Rosh Chodesh (the beginning of a new Jewish month).
   */
  isRoshChodesh: boolean;

  /**
   * Whether the date is during Chanukah.
   */
  isChanukah: boolean;

  /**
   * Whether the date is Purim.
   */
  isPurim: boolean;

  /**
   * Whether the date is a Jewish fast day (Tzom).
   */
  isTzom: boolean;

  /**
   * The name(s) of any holiday or observance that falls on the date.
   *
   * @remarks
   * Includes the specific Yom Tov name(s) (e.g. `"Rosh Hashanah"`, `"Sukkot"`)
   * plus a label for each of the other matched observances: `"Chol HaMoed"`,
   * `"Rosh Chodesh"`, `"Chanukah"`, `"Purim"`, and `"Tzom"`. Empty when none
   * apply. May contain more than one entry when a date carries multiple
   * observances (e.g. `["Rosh Hashanah", "Rosh Chodesh"]`).
   */
  holidays: string[];
}
