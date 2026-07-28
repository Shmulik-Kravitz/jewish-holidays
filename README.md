# Jewish Holidays

An easy-to-use npm package for checking Jewish holidays and Shabbat.

<p align="center">
  <a href="https://www.npmjs.com/package/jewish-holidays">
    <img src="https://img.shields.io/npm/v/jewish-holidays.svg" alt="npm version" />
  </a>
  <a href="https://github.com/Shmulik-Kravitz/jewish-holidays/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  </a>
  <img src="https://github.com/Shmulik-Kravitz/jewish-holidays/actions/workflows/main.yml/badge.svg" alt="Build Status" />
  <img src="https://img.shields.io/badge/Code%20Coverage-100%25-success?style=flat" alt="Code Coverage" />
</p>
## Installation

To install the package, run one of the following commands:

```bash
npm i jewish-holidays
```
or with yarn
```bash
yarn add jewish-holidays
```

## Usage

You can use the package in your JavaScript projects as shown below:

```javascript
import { isYomTov, isShabbat } from 'jewish-holidays';

// Check if a date is Yom Tov
const date = new Date();
const isInChutzLaaretz = true; // Adjust as needed
console.log(isYomTov(date, isInChutzLaaretz)); // true or false

// Check if a date is Shabbat
console.log(isShabbat(date)); // true or false
```

## Functions

### `getDateInfo`

```typescript
getDateInfo(date: Date | BasicJewishDate, isChutzLaaretz?: boolean, language?: Language) => DateInfo
```

Returns a full summary of the given date, aggregating every holiday/observance
check in a single object.

- **date**: A JavaScript Date object or a BasicJewishDate object.
- **isChutzLaaretz**: *(optional)* A boolean indicating if the calculation should consider diaspora holidays.
- **language**: *(optional)* `'en'` or `'he'` — the language to report names in. Defaults to `'en'`. See [Languages](#languages).

The returned `DateInfo` object contains the normalized `jewishDate`, the boolean
flags `isYomTov`, `isErevYomTov`, `isCholHaMoed`, `isShabbat`, `isErevShabbat`,
`isRoshChodesh`, `isChanukah`, `isPurim`, `isTzom`, and `holidays` — the name(s)
of any matched observance (the specific Yom Tov name(s), the specific Purim name
(`Purim` or `Shushan Purim`), the specific fast name (e.g. `Tisha BeAv`), plus a
label for each of `Chol HaMoed`, `Rosh Chodesh` and `Chanukah`), or an empty
array. Each observance is named only once, so 10 Tishri is `["Yom Kippur"]`
rather than a Yom Tov entry and a separate fast entry.

On a fast day it also carries `tzom`, a `TzomInfo` object naming the fast and
saying how it was shifted off Shabbat, if at all — see
[`getTzomInfo`](#gettzominfo). The field is absent on every other day.

```javascript
import { getDateInfo } from 'jewish-holidays';

const info = getDateInfo(new Date(2024, 9, 3)); // Rosh Hashanah
console.log(info.isYomTov); // true
console.log(info.holidays); // ["Rosh Hashanah", "Rosh Chodesh"]

const fast = getDateInfo(new Date(2029, 6, 22)); // 10 Av 5789
console.log(fast.tzom); // { name: "Tisha BeAv", shift: "postponed" }
console.log(fast.holidays); // ["Tisha BeAv"]

const hebrew = getDateInfo(new Date(2029, 6, 22), false, 'he');
console.log(hebrew.tzom); // { name: "תשעה באב", shift: "postponed" }
console.log(hebrew.holidays); // ["תשעה באב"]
```

### `getTodayInfo`

```typescript
getTodayInfo(isChutzLaaretz?: boolean, language?: Language) => DateInfo
```

A convenience wrapper that returns `getDateInfo` for today's date (`new Date()`).

- **isChutzLaaretz**: *(optional)* A boolean indicating if the calculation should consider diaspora holidays.
- **language**: *(optional)* `'en'` or `'he'`. Defaults to `'en'`.

### `isYomTov`

```typescript
isYomTov(date: Date | BasicJewishDate, isChutzLaaretz: boolean) => boolean
```

Determines if the given date is a Yom Tov (Jewish holiday).

- **date**: A JavaScript Date object or a BasicJewishDate object.
- **isChutzLaaretz**: A boolean indicating if the calculation should consider diaspora holidays.

### `isShabbat`

```typescript
isShabbat(date: Date | BasicJewishDate) => boolean
```

Determines if the given date is Shabbat.

- **date**: A JavaScript Date object or a BasicJewishDate object.



### `isErevShabbat`

```typescript
isErevShabbat(date: Date | BasicJewishDate) => boolean
```

Determines if the given date is Erev Shabbat (Friday).

- **date**: A JavaScript Date object or a BasicJewishDate object.

### `isErevYomTov`

```typescript
isErevYomTov(date: Date | BasicJewishDate) => boolean
```

Determines if the given date is Erev Yom Tov (the day before a Jewish holiday).

- **date**: A JavaScript Date object or a BasicJewishDate object.

### `isCholHaMoed`

```typescript
isCholHaMoed(date: Date | BasicJewishDate, isChutzLaaretz?: boolean) => boolean
```

Determines if the given date is Chol HaMoed (the intermediate days of Passover or Sukkot).

- **date**: A JavaScript Date object or a BasicJewishDate object.
- **isChutzLaaretz**: *(optional)* A boolean indicating if the calculation should consider diaspora holidays.

### `isRoshChodesh`

```typescript
isRoshChodesh(date: Date | BasicJewishDate) => boolean
```

Determines if the given date is Rosh Chodesh (the beginning of a new Jewish month).

- **date**: A JavaScript Date object or a BasicJewishDate object.

### `isChanukah`

```typescript
isChanukah(date: Date | BasicJewishDate) => boolean
```

Determines if the given date is during Chanukah.

- **date**: A JavaScript Date object or a BasicJewishDate object.

### `isPurim`

```typescript
isPurim(date: Date | BasicJewishDate) => boolean
```

Determines if the given date is Purim.

- **date**: A JavaScript Date object or a BasicJewishDate object.

### `isTzom`

```typescript
isTzom(date: Date | BasicJewishDate) => boolean
```

Determines if the given date is a Jewish fast day (Tzom).

- **date**: A JavaScript Date object or a BasicJewishDate object.

A fast whose calendar date falls on Shabbat is observed on another day, so this
returns `false` for the Shabbat and `true` for the day the fast moved to.

### `getTzomInfo`

```typescript
getTzomInfo(date: Date | BasicJewishDate, language?: Language) => TzomInfo | undefined
```

Returns the fast day observed on the given date, or `undefined` when it is not a
fast day.

- **date**: A JavaScript Date object or a BasicJewishDate object.
- **language**: *(optional)* `'en'` or `'he'`. Defaults to `'en'`.

`TzomInfo` is `{ name: string; shift: "postponed" | "advanced" | null }`. A fast
observed on its own calendar date has `shift: null`. When the calendar date falls
on Shabbat the fast is either **postponed** to the Sunday (Tzom Gdalia, Shiva
Asar BeTamuz, Tisha BeAv) or **advanced** to the preceding Thursday (Taanit
Esther, whose Sunday is Purim itself, and Taanit Bechorot, whose Sunday is Erev
Pesach). Yom Kippur is fasted on Shabbat itself, and Asara BeTevet can fall on
Friday but never on Shabbat.

```javascript
import { getTzomInfo } from 'jewish-holidays';

getTzomInfo(new Date(2029, 6, 22)); // { name: "Tisha BeAv", shift: "postponed" }
getTzomInfo(new Date(2024, 2, 21)); // { name: "Taanit Esther", shift: "advanced" }
getTzomInfo(new Date(2025, 2, 13)); // { name: "Taanit Esther", shift: null }
getTzomInfo(new Date(2024, 2, 23)); // undefined — 13 AdarII fell on Shabbat
getTzomInfo(new Date(2029, 6, 22), 'he'); // { name: "תשעה באב", shift: "postponed" }
```

`shift` is a stable discriminator, not display text, so it stays in English in
both languages — render it yourself, e.g. `נדחה` for `"postponed"` and `מוקדם`
for `"advanced"`.

### `getTzomotList`

```typescript
getTzomotList() => Tzom[]
```

Returns the list of fast days, each a `Holiday` plus `shiftOnShabbat`, the rule
that applies when its calendar date falls on Shabbat (`"postponed"`,
`"advanced"`, or `null` for the fasts that are never shifted).

```javascript
import { getTzomotList } from 'jewish-holidays';

console.log(getTzomotList()[0]);
// { day: 3, monthName: "Tishri", name: "Tzom Gdalia",
//   hebrewName: "צום גדליה", shiftOnShabbat: "postponed" }
```

## Languages

Names are available in transliterated English and in Hebrew. `Language` is
`'en' | 'he'`, and `'en'` is the default everywhere, so existing code keeps
returning exactly what it did before.

Every entry a holiday list returns carries **both** names — `name` and
`hebrewName` — so `getTzomotList`, `getYomTovList` and `getPurimList` take no
argument and a bilingual consumer needs only one call:

```javascript
import { getTzomotList, getHolidayName } from 'jewish-holidays';

const tishaBeAv = getTzomotList().find((t) => t.name === 'Tisha BeAv');
console.log(tishaBeAv.name);       // "Tisha BeAv"
console.log(tishaBeAv.hebrewName); // "תשעה באב"

getHolidayName(tishaBeAv, 'he'); // "תשעה באב"
```

The functions that report a *single* resolved name — `getDateInfo`,
`getTodayInfo` and `getTzomInfo` — take a `language` argument that decides which
one lands in `holidays` and `tzom.name`:

```javascript
getDateInfo(new Date(2024, 9, 3)).holidays;              // ["Rosh Hashanah", "Rosh Chodesh"]
getDateInfo(new Date(2024, 9, 3), false, 'he').holidays; // ["ראש השנה", "ראש חודש"]
```

### `getHolidayName`

```typescript
getHolidayName(holiday: Holiday, language?: Language) => string
```

Returns a holiday's name in the requested language.

- **holiday**: Any `Holiday` (or `Tzom`) entry.
- **language**: *(optional)* `'en'` or `'he'`. Defaults to `'en'`.

## License

MIT
