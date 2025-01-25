import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isChanukah } from "../../src/chanukah";

describe("Validation of Chanukah using Jewish dates", () => {
  it("should return false for Chanukah on 24 Kislev 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 24,
      monthName: "Kislev",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(false);
  });
  it("should return true for Chanukah on 25 Kislev 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 25,
      monthName: "Kislev",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chanukah on 26 Kislev 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 26,
      monthName: "Kislev",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chanukah on 27 Kislev 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 27,
      monthName: "Kislev",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chanukah on 28 Kislev 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 28,
      monthName: "Kislev",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chanukah on 29 Kislev 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 29,
      monthName: "Kislev",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chanukah on 30 Kislev 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 30,
      monthName: "Kislev",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chanukah on 1 Tevet 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 1,
      monthName: "Tevet",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chanukah on 2 Tevet 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 2,
      monthName: "Tevet",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return false for Chanukah on 3 Tevet 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 3,
      monthName: "Tevet",
      year: 5785,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Chanukah on 3 Tevet 5790", () => {
    const jewishDate: BasicJewishDate = {
      day: 3,
      monthName: "Tevet",
      year: 5790,
    };
    const result = isChanukah(jewishDate);
    expect(result).toStrictEqual(true);
  });
});
