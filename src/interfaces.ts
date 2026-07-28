import type { BasicJewishDate, JewishMonthType } from "jewish-date";

/**
 * The language in which holiday and fast names are reported.
 *
 * @remarks
 * - `"en"` - transliterated English, e.g. `"Tisha BeAv"`.
 * - `"he"` - Hebrew, e.g. `"תשעה באב"`.
 *
 * @public
 */
export type Language = "en" | "he";

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

  /**
   * The name of the holiday in Hebrew.
   *
   * @remarks
   * The Hebrew counterpart of {@link Holiday.name}. Every entry carries both, so
   * a consumer can render either language, or both, without a second lookup.
   *
   * @example
   * // Example: "פסח"
   * const holiday: Holiday = \{ day: 15, monthName: "Nisan", name: "Pesach", hebrewName: "פסח" \};
   */
  hebrewName: string;
}

/**
 * The direction in which a fast day moves when its calendar date falls on Shabbat.
 *
 * @remarks
 * - `"postponed"` - the fast is observed on the following day (Sunday). This is
 *   the rule for Tzom Gdalia, Shiva Asar BeTamuz and Tisha BeAv.
 * - `"advanced"` - the fast is brought forward to the preceding Thursday. This is
 *   the rule for the two fasts that precede a festival, Taanit Esther (the Sunday
 *   is Purim itself) and Taanit Bechorot (the Sunday is Erev Pesach).
 *
 * @public
 */
export type TzomShift = "postponed" | "advanced";

/**
 * Represents a Jewish fast day (Tzom).
 *
 * @public
 */
export interface Tzom extends Holiday {
  /**
   * How the fast moves when its calendar date falls on Shabbat, or `null` when
   * the fast is observed on Shabbat itself.
   *
   * @remarks
   * Yom Kippur is fasted even on Shabbat, and Asara BeTevet can never fall on
   * Shabbat, so both carry `null`.
   *
   * @example
   * // Example: Tisha BeAv is postponed to the Sunday
   * const tzom: Tzom = \{ day: 9, monthName: "Av", name: "Tisha BeAv", hebrewName: "תשעה באב", shiftOnShabbat: "postponed" \};
   */
  shiftOnShabbat: TzomShift | null;
}

/**
 * Describes the fast day observed on a given date.
 *
 * @public
 */
export interface TzomInfo {
  /**
   * The name of the fast, e.g. `"Tisha BeAv"` or `"תשעה באב"`, in the requested
   * language.
   */
  name: string;

  /**
   * How the fast was shifted to reach this date, or `null` when it is observed
   * on its own calendar date.
   */
  shift: TzomShift | null;
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
   * The fast day observed on the date, absent when the date is not a fast day.
   *
   * @remarks
   * Carries the specific fast name and how it was shifted to reach this date.
   * A fast observed on its own calendar date has `shift: null`; a fast moved off
   * Shabbat has `shift: "postponed"` or `shift: "advanced"`.
   *
   * @example
   * // Example: 10 Av 5789, Tisha BeAv postponed from Shabbat
   * const info = getDateInfo(new Date(2029, 6, 22));
   * console.log(info.tzom); // \{ name: "Tisha BeAv", shift: "postponed" \}
   */
  tzom?: TzomInfo;

  /**
   * The name(s) of any holiday or observance that falls on the date.
   *
   * @remarks
   * Includes the specific Yom Tov name(s) (e.g. `"Rosh Hashanah"`, `"Sukkot"`),
   * the specific Purim name (`"Purim"` or `"Shushan Purim"`), the specific fast
   * name (e.g. `"Tisha BeAv"`, `"Taanit Esther"`), plus a label for each of the
   * remaining matched observances: `"Chol HaMoed"`, `"Rosh Chodesh"` and
   * `"Chanukah"`. Empty when none apply. May contain more than one entry when a
   * date carries multiple observances (e.g. `["Rosh Hashanah", "Rosh Chodesh"]`),
   * but never names the same observance twice - 10 Tishri is listed once as
   * `["Yom Kippur"]`, even though it is both a Yom Tov and a fast.
   *
   * Every name is reported in the language requested from `getDateInfo`, so in
   * Hebrew the same date reads `["ראש השנה", "ראש חודש"]`.
   */
  holidays: string[];
}
