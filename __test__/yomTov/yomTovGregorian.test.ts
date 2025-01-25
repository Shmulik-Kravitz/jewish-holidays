import { describe, expect, it } from "vitest";
import { isYomTov } from "../../src/yomTov";

describe("Yom Tov validation by Gregorian Date", () => {
  it("should recognize October 3, 2024 as Rosh Hashanah", () => {
    const result = isYomTov(new Date(2024, 9, 3));
    expect(result).toStrictEqual(true);
  });

  it("should recognize October 4, 2024 as Rosh Hashanah", () => {
    const result = isYomTov(new Date(2024, 9, 4));
    expect(result).toStrictEqual(true);
  });

  it("should recognize October 12, 2024 as Yom Kippur", () => {
    const result = isYomTov(new Date(2024, 9, 12));
    expect(result).toStrictEqual(true);
  });

  it("should return true for Sukkot on October 17, 2024", () => {
    const result = isYomTov(new Date(2024, 9, 17));
    expect(result).toStrictEqual(true);
  });

  it("should return true for Sukkot on October 18, 2024 in Chutz Laaretz", () => {
    const result = isYomTov(new Date(2024, 9, 18), true);
    expect(result).toStrictEqual(true);
  });

  it("should return false for Sukkot on October 18, 2024 in Israel", () => {
    const result = isYomTov(new Date(2024, 9, 18), false);
    expect(result).toStrictEqual(false);
  });
});
