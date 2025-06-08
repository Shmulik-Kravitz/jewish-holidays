import { toJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isRoshChodesh } from "./roshChodesh";

describe("isRoshChodesh", () => {
  it("should return true for the first day of the month", () => {
    const date = new Date(2023, 8, 16); // 1st of Tishri, 5784
    const jewishDate = toJewishDate(date);
    const result = isRoshChodesh(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return false for the 30th day of the month", () => {
    const date = new Date(2023, 8, 15); // 30th of Elul, 5784
    const jewishDate = toJewishDate(date);
    const result = isRoshChodesh(jewishDate);
    expect(result).toStrictEqual(false);
  });

  it("should return false for a non-Rosh Chodesh day", () => {
    const date = new Date(2023, 8, 17); // 2nd of Tishri, 5784
    const jewishDate = toJewishDate(date);
    const result = isRoshChodesh(jewishDate);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Rosh Chodesh Kislev", () => {
    const date = new Date(2023, 11, 13); // 1st of Kislev, 5784
    const jewishDate = toJewishDate(date);
    const result = isRoshChodesh(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return false for a random day", () => {
    const date = new Date(2023, 10, 10); // 26th of Cheshvan, 5784
    const jewishDate = toJewishDate(date);
    const result = isRoshChodesh(jewishDate);
    expect(result).toStrictEqual(false);
  });
});
