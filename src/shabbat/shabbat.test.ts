import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isShabbat } from ".";

describe("Shabbat validation", () => {
  it("should return true for a Gregorian Saturday date", () => {
    const saturdayDate = new Date(2023, 9, 21); // A Saturday
    expect(isShabbat(saturdayDate)).toBe(true);
  });

  it("should return false for a Gregorian non-Saturday date", () => {
    const fridayDate = new Date(2023, 9, 20); // A Friday
    expect(isShabbat(fridayDate)).toBe(false);
  });

  it("should return true for 24-Tishri-5785 that does correspond to Shabbat", () => {
    const jewishDate: BasicJewishDate = {
      day: 24,
      monthName: "Tishri",
      year: 5785,
    };
    expect(isShabbat(jewishDate)).toBe(true);
  });

  it("should return false for 25-Tishri-5785 that does not corresponds to Shabbat", () => {
    const jewishDate: BasicJewishDate = {
      day: 25,
      monthName: "Tishri",
      year: 5785,
    };
    expect(isShabbat(jewishDate)).toBe(false);
  });

  it("should handle invalid dates gracefully", () => {
    const invalidDate = new Date("invalid-date");
    expect(isShabbat(invalidDate)).toBe(false); // Assuming the function handles this gracefully
  });

  it("should return true for 24-Tishri-5785 that does correspond to Shabbat", () => {
    const jewishDate: BasicJewishDate = {
      day: 24,
      monthName: "Tishri",
      year: 5785,
    };
    expect(isShabbat(jewishDate)).toBe(true);
  });

  it("should return false for 25-Tishri-5785 that does not corresponds to Shabbat", () => {
    const jewishDate: BasicJewishDate = {
      day: 25,
      monthName: "Tishri",
      year: 5785,
    };
    expect(isShabbat(jewishDate)).toBe(false);
  });
});
