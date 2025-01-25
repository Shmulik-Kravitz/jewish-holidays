import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isHoliday } from "../../src";
import type { Holiday } from "../../src/interfaces";

describe("Holiday validation", () => {
  it("should return false when given null as BasicJewishDate and holidayList is empty", () => {
    const result = isHoliday(null as unknown as BasicJewishDate, []);
    expect(result).toBe(false);
  });

  it("should return true when given a valid BasicJewishDate for Rosh Hashanah", () => {
    const jewishDate: BasicJewishDate = {
      day: 1,
      monthName: "Tishri",
      year: 5775,
    };
    const holidayList: Holiday[] = [
      { day: 1, monthName: "Tishri", name: "Rosh Hashanah" },
    ];

    const result = isHoliday(jewishDate, holidayList);
    expect(result).toBe(true);
  });
});
