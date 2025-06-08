import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isChanukah } from ".";

describe("Validation of Chanukah using Gregorian dates", () => {
  it("should return true for Chanukah on December 26, 2024 ", () => {
    const result = isChanukah(new Date(2024, 11, 26));
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chanukah on January 2, 2025 ", () => {
    const result = isChanukah(new Date(2025, 0, 2));
    expect(result).toStrictEqual(true);
  });

  it("should return false for Chanukah on January 3, 2025 ", () => {
    const result = isChanukah(new Date(2025, 0, 3));
    expect(result).toStrictEqual(false);
  });

  it("should return true for Chanukah on December 9, 2029 ", () => {
    const result = isChanukah(new Date(2029, 11, 9));
    expect(result).toStrictEqual(true);
  });
});
