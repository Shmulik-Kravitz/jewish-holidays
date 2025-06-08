import { describe, expect, it } from "vitest";
import { isErevYomTov } from ".";

describe("Yom Tov validation by Gregorian Date", () => {
  it("should recognize October 2, 2024 as Erev Rosh Hashanah", () => {
    const result = isErevYomTov(new Date(2024, 9, 2));
    expect(result).toStrictEqual(true);
  });

  it("should recognize October 11, 2024 as Erev Yom Kippur", () => {
    const result = isErevYomTov(new Date(2024, 9, 11));
    expect(result).toStrictEqual(true);
  });

  it("should return true for Erev Sukkot on October 16, 2024", () => {
    const result = isErevYomTov(new Date(2024, 9, 16));
    expect(result).toStrictEqual(true);
  });
});
