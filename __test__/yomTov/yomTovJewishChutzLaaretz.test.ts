import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isYomTov } from "../../src/yomTov";

describe("Yom Tov Validation for Chutz Laaretz with Jewish dates", () => {
  it("should return true for Sukkot on 16 Tishri 5785 in Chutz Laaretz", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isYomTov(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Simchat Torah on 23 Tishri 5785 in Chutz Laaretz", () => {
    const jewishDate: BasicJewishDate = {
      day: 23,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isYomTov(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Pesach on 16 Nisan 5785 in Chutz Laaretz", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isYomTov(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Pesach Shel Pesach on 22 Nisan 5785 in Chutz Laaretz", () => {
    const jewishDate: BasicJewishDate = {
      day: 22,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isYomTov(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Shavuot on 7 Sivan 5785 in Chutz Laaretz", () => {
    const jewishDate: BasicJewishDate = {
      day: 7,
      monthName: "Sivan",
      year: 5785,
    };
    const result = isYomTov(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Sukkot on 16 Tishri 5785 in Israel", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isYomTov(jewishDate, false);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Simchat Torah on 23 Tishri 5785 in Israel", () => {
    const jewishDate: BasicJewishDate = {
      day: 23,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isYomTov(jewishDate, false);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Pesach on 16 Nisan 5785 in Israel", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isYomTov(jewishDate, false);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Pesach Shel Pesach on 22 Nisan 5785 in Israel", () => {
    const jewishDate: BasicJewishDate = {
      day: 22,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isYomTov(jewishDate, false);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Shavuot on 7 Sivan 5785 in Israel", () => {
    const jewishDate: BasicJewishDate = {
      day: 7,
      monthName: "Sivan",
      year: 5785,
    };
    const result = isYomTov(jewishDate, false);
    expect(result).toStrictEqual(false);
  });
});
