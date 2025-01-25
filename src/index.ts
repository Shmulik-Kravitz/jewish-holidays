/**
 * @packageDocumentation
 * @module jewish-holidays
 */

/**
 * A simple npm package to check Jewish holidays and Shabbat.
 *
 * ## Installation
 *
 * ```bash
 * npm install jewish-holidays
 * ```
 *
 * ## Usage
 *
 * ```javascript
 * import { isYomTov, isShabbat } from 'jewish-holidays';
 *
 * // Check if a date is Yom Tov
 * const date = new Date();
 * const isInChutzLaaretz = true; // Adjust as needed
 * console.log(isYomTov(date, isInChutzLaaretz)); // true or false
 *
 * // Check if a date is Shabbat
 * console.log(isShabbat(date)); // true or false
 * ```
 *
 * ## Functions
 *
 * ### `isYomTov(date: Date | BasicJewishDate, isChutzLaaretz: boolean) => boolean`
 *
 * Determines if the given date is a Yom Tov (Jewish holiday).
 *
 * - `date`: A JavaScript Date object or a BasicJewishDate object.
 * - `isChutzLaaretz`: A boolean indicating if the calculation should consider diaspora holidays.
 *
 * - `boolean`: `true` if the date is a Yom Tov, `false` otherwise.
 *
 * ### `isShabbat(date: Date | BasicJewishDate) => boolean`
 *
 * Determines if the given date is Shabbat.
 *
 * - `date`: A JavaScript Date object or a BasicJewishDate object.
 *
 * - `boolean`: `true` if the date is Shabbat, `false` otherwise.
 *
 * ## License
 *
 * This package is licensed under the MIT License. See the `LICENSE` file for more details.
 */

export * from "./cholHaMoed";
export * from "./holiday";
export * from "./interfaces";
export * from "./chanukah";
export * from "./shabbat";
export * from "./yomTov";
