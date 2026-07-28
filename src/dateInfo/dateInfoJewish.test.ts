import type { BasicJewishDate } from "jewish-date";
import { describe, expect, it } from "vitest";
import type { DateInfo } from "../interfaces";
import { getDateInfo } from ".";

describe("getDateInfo by Jewish Date", () => {
  it("should summarize 16 Tishri 5785 as Chol HaMoed in Israel", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Tishri",
      year: 5785,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: true,
      isShabbat: false,
      isErevShabbat: true,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: false,
      holidays: ["Chol HaMoed"],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });

  it("should summarize 16 Tishri 5785 as Yom Tov (Sukkot) in Chutz Laaretz", () => {
    const jewishDate: BasicJewishDate = {
      day: 16,
      monthName: "Tishri",
      year: 5785,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: true,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: true,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: false,
      holidays: ["Sukkot"],
    };
    expect(getDateInfo(jewishDate, true)).toStrictEqual(expected);
  });

  it("should summarize 25 Kislev 5785 as Chanukah", () => {
    const jewishDate: BasicJewishDate = {
      day: 25,
      monthName: "Kislev",
      year: 5785,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: true,
      isPurim: false,
      isTzom: false,
      holidays: ["Chanukah"],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });

  it("should summarize 14 Adar 5784 as Purim", () => {
    const jewishDate: BasicJewishDate = {
      day: 14,
      monthName: "Adar",
      year: 5784,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: true,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: true,
      isTzom: false,
      holidays: ["Purim"],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });

  it("should summarize 15 AdarII 5784 as Shushan Purim", () => {
    const jewishDate: BasicJewishDate = {
      day: 15,
      monthName: "AdarII",
      year: 5784,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: true,
      isTzom: false,
      holidays: ["Shushan Purim"],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });

  it("should summarize 11 AdarII 5784 as Taanit Esther, advanced", () => {
    const jewishDate: BasicJewishDate = {
      day: 11,
      monthName: "AdarII",
      year: 5784,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: true,
      tzom: { name: "Taanit Esther", shift: "advanced" },
      holidays: ["Taanit Esther"],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });

  it("should summarize 13 Adar 5785 as an on-time Taanit Esther", () => {
    const jewishDate: BasicJewishDate = {
      day: 13,
      monthName: "Adar",
      year: 5785,
    };
    const info = getDateInfo(jewishDate);
    expect(info.tzom).toStrictEqual({ name: "Taanit Esther", shift: null });
    expect(info.holidays).toStrictEqual(["Taanit Esther"]);
  });

  it("should summarize 10 Tishri 5785 as Yom Kippur once, in Chutz Laaretz too", () => {
    const jewishDate: BasicJewishDate = {
      day: 10,
      monthName: "Tishri",
      year: 5785,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: true,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: true,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: true,
      tzom: { name: "Yom Kippur", shift: null },
      holidays: ["Yom Kippur"],
    };
    expect(getDateInfo(jewishDate, true)).toStrictEqual(expected);
  });

  it("should summarize 14 Nisan 5785 (Shabbat) as not a fast, in Chutz Laaretz too", () => {
    const jewishDate: BasicJewishDate = {
      day: 14,
      monthName: "Nisan",
      year: 5785,
    };
    const info = getDateInfo(jewishDate, true);
    expect(info.isTzom).toStrictEqual(false);
    expect(info.tzom).toBeUndefined();
  });

  it("should summarize 12 Nisan 5785 as Taanit Bechorot, advanced, in Chutz Laaretz too", () => {
    const jewishDate: BasicJewishDate = {
      day: 12,
      monthName: "Nisan",
      year: 5785,
    };
    const info = getDateInfo(jewishDate, true);
    expect(info.tzom).toStrictEqual({
      name: "Taanit Bechorot",
      shift: "advanced",
    });
    expect(info.holidays).toStrictEqual(["Taanit Bechorot"]);
  });

  it("should summarize 1 Tishri 5785 in Hebrew", () => {
    const jewishDate: BasicJewishDate = {
      day: 1,
      monthName: "Tishri",
      year: 5785,
    };
    expect(getDateInfo(jewishDate, false, "he").holidays).toStrictEqual([
      "ראש השנה",
      "ראש חודש",
    ]);
  });

  it("should name Chol HaMoed and Chanukah in Hebrew", () => {
    const cholHaMoed: BasicJewishDate = {
      day: 16,
      monthName: "Tishri",
      year: 5785,
    };
    const chanukah: BasicJewishDate = {
      day: 25,
      monthName: "Kislev",
      year: 5785,
    };
    expect(getDateInfo(cholHaMoed, false, "he").holidays).toStrictEqual([
      "חול המועד",
    ]);
    expect(getDateInfo(chanukah, false, "he").holidays).toStrictEqual([
      "חנוכה",
    ]);
  });

  it("should name Purim and Shushan Purim in Hebrew", () => {
    const purim: BasicJewishDate = { day: 14, monthName: "AdarII", year: 5784 };
    const shushanPurim: BasicJewishDate = {
      day: 15,
      monthName: "AdarII",
      year: 5784,
    };
    expect(getDateInfo(purim, false, "he").holidays).toStrictEqual(["פורים"]);
    expect(getDateInfo(shushanPurim, false, "he").holidays).toStrictEqual([
      "שושן פורים",
    ]);
  });

  it("should list Yom Kippur once in Hebrew, as Yom Tov and fast alike", () => {
    const jewishDate: BasicJewishDate = {
      day: 10,
      monthName: "Tishri",
      year: 5785,
    };
    const info = getDateInfo(jewishDate, true, "he");
    expect(info.holidays).toStrictEqual(["יום הכיפורים"]);
    expect(info.tzom).toStrictEqual({ name: "יום הכיפורים", shift: null });
  });

  it("should name a Chutz Laaretz-only Yom Tov in both languages", () => {
    const jewishDate: BasicJewishDate = {
      day: 22,
      monthName: "Nisan",
      year: 5785,
    };
    expect(getDateInfo(jewishDate, true).holidays).toStrictEqual([
      "Acharon Shel Pesach",
    ]);
    expect(getDateInfo(jewishDate, true, "he").holidays).toStrictEqual([
      "אחרון של פסח",
    ]);
  });

  it("should summarize 1 Tishri 5785 as Rosh Hashanah and Rosh Chodesh", () => {
    const jewishDate: BasicJewishDate = {
      day: 1,
      monthName: "Tishri",
      year: 5785,
    };
    const expected: DateInfo = {
      jewishDate,
      isYomTov: true,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: true,
      isChanukah: false,
      isPurim: false,
      isTzom: false,
      holidays: ["Rosh Hashanah", "Rosh Chodesh"],
    };
    expect(getDateInfo(jewishDate)).toStrictEqual(expected);
  });
});
