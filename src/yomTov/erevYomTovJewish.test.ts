import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isErevYomTov } from ".";

describe("Yom Tov validation for Jewish Dates", () => {
  it("should return true for Erev Rosh Hashanah on 29 Elul 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 29,
      monthName: "Elul",
      year: 5785,
    };
    const result = isErevYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Erev Yom Kippur on 9 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 9,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isErevYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Erev Sukkot on 14 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 14,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isErevYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Erev Simchat Torah on 21 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 21,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isErevYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Erev Pesach on 14 Nisan 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 14,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isErevYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Erev Shevii Shel Pesach on 20 Nisan 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 20,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isErevYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Erev Shavuot on 5 Sivan 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 5,
      monthName: "Sivan",
      year: 5785,
    };
    const result = isErevYomTov(jewishDate);
    expect(result).toStrictEqual(true);
  });
});
