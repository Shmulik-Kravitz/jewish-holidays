import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isErevShabbat } from ".";

describe("Erev Shabbat validation", () => {
  it("should handle invalid dates gracefully", () => {
    const invalidDate = new Date("invalid-date");
    expect(isErevShabbat(invalidDate)).toBe(false); // Assuming the function handles this gracefully
  });

  it("should return true for a Gregorian Friday date", () => {
    const fridayDate = new Date(2023, 9, 20); // A Friday
    expect(isErevShabbat(fridayDate)).toBe(true);
  });

  it("should return true for 23-Tishri-5785 that does correspond to Erev Shabbat", () => {
    const jewishDate: BasicJewishDate = {
      day: 23,
      monthName: "Tishri",
      year: 5785,
    };
    expect(isErevShabbat(jewishDate)).toBe(true);
  });

  it("should return false for 22-Tishri-5785 that does not correspond to Erev Shabbat", () => {
    const jewishDate: BasicJewishDate = {
      day: 22,
      monthName: "Tishri",
      year: 5785,
    };
    expect(isErevShabbat(jewishDate)).toBe(false);
  });

  it("should return false for 24-Tishri-5785 that does not correspond to Erev Shabbat", () => {
    const jewishDate: BasicJewishDate = {
      day: 24,
      monthName: "Tishri",
      year: 5785,
    };
    expect(isErevShabbat(jewishDate)).toBe(false);
  });
});
