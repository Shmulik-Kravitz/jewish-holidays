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


<br />
<details markdown="1">
<summary>Click for more</summary>

```typescript
export declare const isErevShabbat: (date: Date | BasicJewishDate) => boolean;

export declare const isErevYomTov: (date: Date | BasicJewishDate) => boolean;

export declare const isCholHaMoed: (date: Date | BasicJewishDate, isChutzLaaretz?: boolean) => boolean;

export declare const isChanukah: (date: Date | BasicJewishDate) => boolean;
```
</details>

## License

MIT
