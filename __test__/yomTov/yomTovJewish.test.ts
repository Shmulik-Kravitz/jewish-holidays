import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isYomTov } from "../../src/yomTov";

describe("Yom Tov validation for Jewish Dates", () => {
  it("should return true for Rosh Hashanah on 1 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 1,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Rosh Hashanah on 2 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 2,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Yom Kippur on 10 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 10,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Sukkot on 15 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 15,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Sukkot on 22 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 22,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Pesach on 15 Nisan 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 15,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Shevii Shel Pesach on 21 Nisan 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 21,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Shavuot on 6 Sivan 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 6,
      monthName: "Sivan",
      year: 5785,
    };
    const result = isYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });
});
