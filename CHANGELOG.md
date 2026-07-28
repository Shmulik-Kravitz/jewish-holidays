# Changelog

## 2.0.0

The previous release was 1.2.3; 1.3.0 was never published, so the `getDateInfo`
work planned for it ships here.

### Breaking changes
- `Holiday` gained a required `hebrewName` property, so any hand-built `Holiday` object now has to supply one.
- Renamed the 22 Nisan Chutz Laaretz holiday from `"Pesach Shel Pesach"` to `"Acharon Shel Pesach"`.
- `isTzom` no longer reports a fast on a Shabbat 13 Adar / 13 Adar II or 14 Nisan, and now reports one on the Thursday before - see the fixes below.

### Added
- `getDateInfo` - Returns a full summary of a given date (the Jewish date, every holiday/observance flag, and the name(s) of any matched observance).
- `getTodayInfo` - Convenience wrapper that returns `getDateInfo` for today's date.
- The `DateInfo` interface describing the aggregated result. Its `holidays` array names the specific observance - the fast's own name (`"Tisha BeAv"`, `"Taanit Esther"`, ...), `"Shushan Purim"` on 15 Adar / 15 Adar II - and never names one observance twice, so 10 Tishri is `["Yom Kippur"]` rather than a Yom Tov entry plus a separate fast entry.
- `DateInfo.tzom` - The fast observed on the date, its name and how it was shifted off Shabbat; absent on every other day.
- `getTzomInfo` - Returns the fast observed on a given date, or `undefined` when the date is not a fast day.
- `getTzomotList` - Returns the list of fast days, each with the rule that applies when it falls on Shabbat.
- The `Tzom`, `TzomInfo` and `TzomShift` interfaces.
- Hebrew and English names for every holiday and fast:
  - the `Language` type (`'en' | 'he'`), defaulting to `'en'` everywhere.
  - `hebrewName` on every holiday list entry, alongside `name`.
  - a `language` argument on `getDateInfo`, `getTodayInfo` and `getTzomInfo`.
  - `getHolidayName` - Returns a holiday's name in the requested language.

### Fixed
- Taanit Esther (13 Adar / 13 Adar II) falling on Shabbat is now advanced to the Thursday rather than postponed to the Sunday, which is Purim itself.
- Taanit Bechorot (14 Nisan) is now shiftable at all, and likewise advanced to the Thursday; previously the package reported a fast on a Shabbat Erev Pesach.
- Fasts are modelled as postponed-to-Sunday or advanced-to-Thursday rather than one delayable flag. Yom Kippur is still fasted on Shabbat, and Asara BeTevet can fall on Friday but never on Shabbat.
- Dropped the `"(delayed)"` name suffixes for postponed fasts; the shift is now reported structurally by `TzomInfo.shift`.

## 1.2.2
- Added the following methods:
  - `isTzom` - Determines whether a given date is a Jewish fast day (Tzom).
  - `isPurim` - Determines whether a given date is Purim (including both Adar in regular year and Adar II in leap year).
  - `isRoshChodesh` - Determines whether a given date is Rosh Chodesh (the beginning of a new Hebrew month).
- Add support for delayed fasts (Tzomot Nidchim)
- Add Taanit Esther support for both Adar in regular year and Adar II in leap year
- Improve test coverage for Jewish holidays
- Standardize test formats across all holiday types

## 1.2.1

- Add support for custom holiday definitions.
- Improve documentation for all methods.
- Refactor date handling for better accuracy.
- Update dependencies to latest versions.

## 1.1.0

- Added the following methods:
  - `isErevShabbat` - Determines whether a given date is Erev Shabbat (the day before Shabbat).
  - `isErevYomTov` - Determines whether a given date is a Erev Yom Tov (the day before a Jewish holiday).
  - `isCholHaMoed` - Determines whether a given date falls within Chol HaMoed.
  - `isChanukah` - Determines whether a given date falls during Chanukah.
- Change typos in tests
- Upgrade all build tools to latest.


## 1.0.3

- Fix issue in isYomTov not returning true for Simchat Torah.

## 1.0.2

- Fix bundle issue (don't use version 1.0.1)

## 1.0.1

- Initial release
