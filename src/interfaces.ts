import type { JewishMonthType } from "jewish-date";

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
