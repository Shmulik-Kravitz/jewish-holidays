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



## License

MIT
