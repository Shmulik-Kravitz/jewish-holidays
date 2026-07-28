import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import type { Holiday } from "../interfaces";
import { getHolidayName, isDateInHolidayList } from ".";

const roshHashanah: Holiday = {
  day: 1,
  monthName: "Tishri",
  name: "Rosh Hashanah",
  hebrewName: "ראש השנה",
};

describe("Holiday validation", () => {
  it("should return false when given null as BasicJewishDate and holidayList is empty", () => {
    const result = isDateInHolidayList(null as unknown as BasicJewishDate, []);
    expect(result).toBe(false);
  });

  it("should return true when given a valid BasicJewishDate for Rosh Hashanah", () => {
    const jewishDate: BasicJewishDate = {
      day: 1,
      monthName: "Tishri",
      year: 5775,
    };
    const holidayList: Holiday[] = [roshHashanah];

    const result = isDateInHolidayList(jewishDate, holidayList);
    expect(result).toBe(true);
  });
});

describe("getHolidayName", () => {
  it("should return the English name by default", () => {
    expect(getHolidayName(roshHashanah)).toBe("Rosh Hashanah");
  });

  it("should return the English name when asked for English", () => {
    expect(getHolidayName(roshHashanah, "en")).toBe("Rosh Hashanah");
  });

  it("should return the Hebrew name when asked for Hebrew", () => {
    expect(getHolidayName(roshHashanah, "he")).toBe("ראש השנה");
  });
});
