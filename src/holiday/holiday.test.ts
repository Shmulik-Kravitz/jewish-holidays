import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import { isDateInHolidayList } from ".";
import type { Holiday } from "../interfaces";

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
    const holidayList: Holiday[] = [
      { day: 1, monthName: "Tishri", name: "Rosh Hashanah" },
    ];

    const result = isDateInHolidayList(jewishDate, holidayList);
    expect(result).toBe(true);
  });
});
