# Changelog

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
