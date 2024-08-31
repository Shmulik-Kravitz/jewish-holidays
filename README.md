# Jewish Holidays

A simple npm package to check Jewish holidays and Shabbat.

## Installation

To install the package, run the following command:

```bash
npm install jewish-holidays
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

## License

MIT
