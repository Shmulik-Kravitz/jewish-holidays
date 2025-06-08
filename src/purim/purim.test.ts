import { JewishMonth, toJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isPurim } from "./purim";

describe("Purim validation by Gregorian Date", () => {
  it("should recognize March 24, 2024 as Purim", () => {
    const result = isPurim(new Date(2024, 2, 24));
    expect(result).toStrictEqual(true);
  });

  it("should recognize March 25, 2024 as Shushan Purim", () => {
    const result = isPurim(new Date(2024, 2, 25));
    expect(result).toStrictEqual(true);
  });

  it("should return false for a non-Purim day", () => {
    const result = isPurim(new Date(2024, 2, 22));
    expect(result).toStrictEqual(false);
  });
});

describe("Purim validation by Jewish Date", () => {
  it("should recognize 14th of Adar as Purim", () => {
    const jewishDate = { day: 14, monthName: JewishMonth.Adar, year: 5784 };
    const result = isPurim(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should recognize 15th of Adar as Shushan Purim", () => {
    const jewishDate = { day: 15, monthName: JewishMonth.Adar, year: 5784 };
    const result = isPurim(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return false for a non-Purim day", () => {
    const jewishDate = { day: 13, monthName: JewishMonth.Adar, year: 5784 };
    const result = isPurim(jewishDate);
    expect(result).toStrictEqual(false);
  });
});
