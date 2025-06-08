import { JewishMonth, toJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isTzom } from ".";

describe("Tzomot validation by Gregorian Date", () => {
  it("should recognize October 6, 2024 as Tzom Gdalia", () => {
    const result = isTzom(new Date(2024, 9, 6));
    expect(result).toStrictEqual(true);
  });

    it("should recognize September 25, 2025 as Tzom Gdalia", () => {
    const result = isTzom(new Date(2025, 8, 25));
    expect(result).toStrictEqual(true);
  });


  it("should recognize October 12, 2024 as Yom Kippur", () => {
    const result = isTzom(new Date(2024, 9, 12));
    expect(result).toStrictEqual(true);
  });

  it("should recognize January 10, 2025 as Asara BeTevet", () => {
    const result = isTzom(new Date(2025, 0, 10));
    expect(result).toStrictEqual(true);
  });

  it("should return false for a non-fast day", () => {
    const result = isTzom(new Date(2024, 9, 15));
    expect(result).toStrictEqual(false);
  });
});

describe("Tzomot validation by Jewish Date", () => {
  it("should not recognize 3rd of Tishri as Tzom Gdalia on shabbat", () => {
    const jewishDate = { day: 3, monthName: JewishMonth.Tishri, year: 5785 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(false);
  });

   it("should recognize 4th of Tishri as Tzom Gdalia on sunday", () => {
    const jewishDate = { day: 4, monthName: JewishMonth.Tishri, year: 5785 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should recognize 17th of Tammuz as Shiva Asar BeTamuz", () => {
    const jewishDate = { day: 17, monthName: JewishMonth.Tammuz, year: 5784 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should recognize 9th of Av as Tisha BeAv", () => {
    const jewishDate = { day: 9, monthName: JewishMonth.Av, year: 5784 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return false for a non-fast day", () => {
    const jewishDate = { day: 1, monthName: JewishMonth.Tishri, year: 5785 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(false);
  });
});
