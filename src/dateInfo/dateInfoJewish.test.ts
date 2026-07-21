import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { getDateInfo } from ".";
import type { DateInfo } from "../interfaces";

describe("getDateInfo by Jewish Date", () => {
  it("should summarize 16 Tishri 5785 as Chol HaMoed in Israel", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Tishri",
      year: 5785,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: true,
      isShabbat: false,
      isErevShabbat: true,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: false,
      holidays: [],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });

  it("should summarize 16 Tishri 5785 as Yom Tov (Sukkot) in Chutz Laaretz", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Tishri",
      year: 5785,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: true,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: true,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: false,
      holidays: ["Sukkot"],
    };
    expect(getDateInfo(jewishDate, true)).toStrictEqual(expected);
  });

  it("should summarize 25 Kislev 5785 as Chanukah", () => {
    const jewishDate: BasicJewishDate = {
      day: 25,
      monthName: "Kislev",
      year: 5785,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: true,
      isPurim: false,
      isTzom: false,
      holidays: [],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });

  it("should summarize 14 Adar 5784 as Purim", () => {
    const jewishDate: BasicJewishDate = {
      day: 14,
      monthName: "Adar",
      year: 5784,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: true,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: true,
      isTzom: false,
      holidays: [],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });

  it("should summarize 1 Tishri 5785 as Rosh Hashanah and Rosh Chodesh", () => {
    const jewishDate: BasicJewishDate = {
      day: 1,
      monthName: "Tishri",
      year: 5785,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: true,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: true,
      isChanukah: false,
      isPurim: false,
      isTzom: false,
      holidays: ["Rosh Hashanah"],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });
});
