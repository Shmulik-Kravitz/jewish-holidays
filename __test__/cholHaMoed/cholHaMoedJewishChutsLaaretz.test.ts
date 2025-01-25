import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isCholHaMoed } from "../../src/cholHaMoed";

describe("chol HaMoed validation for Chutz Laaretz Jewish dates", () => {
  it("should return false for Chol HaMoed on 15 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 15,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(false);
  });
  it("should return false for Chol HaMoed on 16 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Chol HaMoed on 17 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 17,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chol HaMoed on 18 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 18,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chol HaMoed on 20 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 20,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chol HaMoed on 21 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 21,
      monthName: "Tishri",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return false for Chol HaMoed on 15 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 15,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(false);
  });

  it("should return false for Chol HaMoed on 16 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Chol HaMoed on 17 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 17,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chol HaMoed on 18 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 18,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chol HaMoed on 20 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 20,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(true);
  });

  it("should return false for Chol HaMoed on 21 Tishri 5785", () => {
    const jewishDate: BasicJewishDate = {
      day: 21,
      monthName: "Nisan",
      year: 5785,
    };
    const result = isCholHaMoed(jewishDate, true);
    expect(result).toStrictEqual(false);
  });
});
