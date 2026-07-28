import { JewishMonth } from "jewish-date";
import { describe, expect, it } from "vitest";
import { getTzomInfo, getTzomotList, isTzom } from ".";

describe("Tzomot validation by Gregorian Date", () => {
  it("should recognize October 6, 2024 as Tzom Gdalia", () => {
    const result = isTzom(new Date(2024, 9, 6));
    expect(result).toStrictEqual(true);
  });

  it("should recognize September 25, 2025 as Tzom Gdalia", () => {
    const result = isTzom(new Date(2025, 8, 25));
    expect(result).toStrictEqual(true);
  });

  it("should recognize October 12, 2024 as Yom Kippur", () => {
    const result = isTzom(new Date(2024, 9, 12));
    expect(result).toStrictEqual(true);
  });

  it("should recognize January 10, 2025 as Asara BeTevet", () => {
    const result = isTzom(new Date(2025, 0, 10));
    expect(result).toStrictEqual(true);
  });

  it("should return false for a non-fast day", () => {
    const result = isTzom(new Date(2024, 9, 15));
    expect(result).toStrictEqual(false);
  });
});

describe("Tzomot validation by Jewish Date", () => {
  it("should not recognize 3rd of Tishri as Tzom Gdalia on shabbat", () => {
    const jewishDate = { day: 3, monthName: JewishMonth.Tishri, year: 5785 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(false);
  });

  it("should recognize 4th of Tishri as Tzom Gdalia on sunday", () => {
    const jewishDate = { day: 4, monthName: JewishMonth.Tishri, year: 5785 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should recognize 17th of Tammuz as Shiva Asar BeTamuz", () => {
    const jewishDate = { day: 17, monthName: JewishMonth.Tammuz, year: 5784 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should recognize 9th of Av as Tisha BeAv", () => {
    const jewishDate = { day: 9, monthName: JewishMonth.Av, year: 5784 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(true);
  });

  it("should return false for a non-fast day", () => {
    const jewishDate = { day: 1, monthName: JewishMonth.Tishri, year: 5785 };
    const result = isTzom(jewishDate);
    expect(result).toStrictEqual(false);
  });
});

describe("getTzomotList", () => {
  it("should expose every fast with its Shabbat shift rule", () => {
    expect(getTzomotList()).toStrictEqual([
      {
        day: 3,
        monthName: JewishMonth.Tishri,
        name: "Tzom Gdalia",
        hebrewName: "צום גדליה",
        shiftOnShabbat: "postponed",
      },
      {
        day: 10,
        monthName: JewishMonth.Tishri,
        name: "Yom Kippur",
        hebrewName: "יום הכיפורים",
        shiftOnShabbat: null,
      },
      {
        day: 10,
        monthName: JewishMonth.Tevet,
        name: "Asara BeTevet",
        hebrewName: "עשרה בטבת",
        shiftOnShabbat: null,
      },
      {
        day: 13,
        monthName: JewishMonth.Adar,
        name: "Taanit Esther",
        hebrewName: "תענית אסתר",
        shiftOnShabbat: "advanced",
      },
      {
        day: 13,
        monthName: JewishMonth.AdarII,
        name: "Taanit Esther",
        hebrewName: "תענית אסתר",
        shiftOnShabbat: "advanced",
      },
      {
        day: 14,
        monthName: JewishMonth.Nisan,
        name: "Taanit Bechorot",
        hebrewName: "תענית בכורות",
        shiftOnShabbat: "advanced",
      },
      {
        day: 17,
        monthName: JewishMonth.Tammuz,
        name: "Shiva Asar BeTamuz",
        hebrewName: "שבעה עשר בתמוז",
        shiftOnShabbat: "postponed",
      },
      {
        day: 9,
        monthName: JewishMonth.Av,
        name: "Tisha BeAv",
        hebrewName: "תשעה באב",
        shiftOnShabbat: "postponed",
      },
    ]);
  });
});

describe("Fast names in Hebrew", () => {
  it("should name a postponed Tisha BeAv in Hebrew", () => {
    expect(getTzomInfo(new Date(2029, 6, 22), "he")).toStrictEqual({
      name: "תשעה באב",
      shift: "postponed",
    });
  });

  it("should name an advanced Taanit Esther in Hebrew", () => {
    expect(getTzomInfo(new Date(2024, 2, 21), "he")).toStrictEqual({
      name: "תענית אסתר",
      shift: "advanced",
    });
  });

  it("should name an on-time fast in Hebrew", () => {
    const jewishDate = { day: 10, monthName: JewishMonth.Tevet, year: 5785 };
    expect(getTzomInfo(jewishDate, "he")).toStrictEqual({
      name: "עשרה בטבת",
      shift: null,
    });
  });

  it("should still return undefined in Hebrew for a non-fast day", () => {
    expect(getTzomInfo(new Date(2024, 2, 23), "he")).toBeUndefined();
  });

  it("should default to English when no language is given", () => {
    expect(getTzomInfo(new Date(2029, 6, 22), "en")).toStrictEqual(
      getTzomInfo(new Date(2029, 6, 22)),
    );
  });
});

describe("Fasts advanced to Thursday when they fall on Shabbat", () => {
  it("should recognize 11 AdarII 5784 (Thursday) as an advanced Taanit Esther", () => {
    const date = new Date(2024, 2, 21);
    expect(getTzomInfo(date)).toStrictEqual({
      name: "Taanit Esther",
      shift: "advanced",
    });
    expect(isTzom(date)).toStrictEqual(true);
  });

  it("should recognize 11 AdarII 5784 by Jewish Date as an advanced Taanit Esther", () => {
    const jewishDate = { day: 11, monthName: JewishMonth.AdarII, year: 5784 };
    expect(getTzomInfo(jewishDate)).toStrictEqual({
      name: "Taanit Esther",
      shift: "advanced",
    });
  });

  it("should not treat 13 AdarII 5784 (Shabbat) as a fast", () => {
    const date = new Date(2024, 2, 23);
    expect(getTzomInfo(date)).toBeUndefined();
    expect(isTzom(date)).toStrictEqual(false);
  });

  it("should not treat 14 AdarII 5784 (Purim, the Sunday) as a fast", () => {
    const date = new Date(2024, 2, 24);
    expect(getTzomInfo(date)).toBeUndefined();
    expect(isTzom(date)).toStrictEqual(false);
  });

  it("should recognize 13 Adar 5785 (Thursday) as an on-time Taanit Esther", () => {
    const date = new Date(2025, 2, 13);
    expect(getTzomInfo(date)).toStrictEqual({
      name: "Taanit Esther",
      shift: null,
    });
    expect(isTzom(date)).toStrictEqual(true);
  });

  it("should recognize 12 Nisan 5785 (Thursday) as an advanced Taanit Bechorot", () => {
    const date = new Date(2025, 3, 10);
    expect(getTzomInfo(date)).toStrictEqual({
      name: "Taanit Bechorot",
      shift: "advanced",
    });
    expect(isTzom(date)).toStrictEqual(true);
  });

  it("should not treat 14 Nisan 5785 (Shabbat erev Pesach) as a fast", () => {
    const date = new Date(2025, 3, 12);
    expect(getTzomInfo(date)).toBeUndefined();
    expect(isTzom(date)).toStrictEqual(false);
  });

  it("should recognize 14 Nisan 5784 as an on-time Taanit Bechorot", () => {
    const jewishDate = { day: 14, monthName: JewishMonth.Nisan, year: 5784 };
    expect(getTzomInfo(jewishDate)).toStrictEqual({
      name: "Taanit Bechorot",
      shift: null,
    });
  });
});

describe("Fasts postponed to Sunday when they fall on Shabbat", () => {
  it("should not treat 3 Tishri 5785 (Shabbat) as a fast", () => {
    const date = new Date(2024, 9, 5);
    expect(getTzomInfo(date)).toBeUndefined();
    expect(isTzom(date)).toStrictEqual(false);
  });

  it("should recognize 4 Tishri 5785 (Sunday) as a postponed Tzom Gdalia", () => {
    const date = new Date(2024, 9, 6);
    expect(getTzomInfo(date)).toStrictEqual({
      name: "Tzom Gdalia",
      shift: "postponed",
    });
  });

  it("should recognize 18 Tammuz 5789 (Sunday) as a postponed Shiva Asar BeTamuz", () => {
    const date = new Date(2029, 6, 1);
    expect(getTzomInfo(date)).toStrictEqual({
      name: "Shiva Asar BeTamuz",
      shift: "postponed",
    });
    expect(isTzom(date)).toStrictEqual(true);
  });

  it("should not treat 17 Tammuz 5789 (Shabbat) as a fast", () => {
    const jewishDate = { day: 17, monthName: JewishMonth.Tammuz, year: 5789 };
    expect(getTzomInfo(jewishDate)).toBeUndefined();
  });

  it("should recognize 10 Av 5789 (Sunday) as a postponed Tisha BeAv", () => {
    const date = new Date(2029, 6, 22);
    expect(getTzomInfo(date)).toStrictEqual({
      name: "Tisha BeAv",
      shift: "postponed",
    });
    expect(isTzom(date)).toStrictEqual(true);
  });

  it("should not treat 9 Av 5789 (Shabbat) as a fast", () => {
    const jewishDate = { day: 9, monthName: JewishMonth.Av, year: 5789 };
    expect(getTzomInfo(jewishDate)).toBeUndefined();
  });

  it("should recognize 9 Av 5784 as an on-time Tisha BeAv", () => {
    const jewishDate = { day: 9, monthName: JewishMonth.Av, year: 5784 };
    expect(getTzomInfo(jewishDate)).toStrictEqual({
      name: "Tisha BeAv",
      shift: null,
    });
  });
});

describe("Fasts that are never shifted", () => {
  it("should recognize 10 Tishri 5785 (Shabbat) as Yom Kippur, unshifted", () => {
    const date = new Date(2024, 9, 12);
    expect(getTzomInfo(date)).toStrictEqual({
      name: "Yom Kippur",
      shift: null,
    });
    expect(isTzom(date)).toStrictEqual(true);
  });

  it("should not treat 11 Tishri 5785 (the Sunday after) as a fast", () => {
    const jewishDate = { day: 11, monthName: JewishMonth.Tishri, year: 5785 };
    expect(getTzomInfo(jewishDate)).toBeUndefined();
  });

  it("should recognize 10 Tevet 5785 as Asara BeTevet, unshifted", () => {
    expect(getTzomInfo(new Date(2025, 0, 10))).toStrictEqual({
      name: "Asara BeTevet",
      shift: null,
    });
  });

  it("should return undefined for a day in a month that holds no fast", () => {
    const jewishDate = { day: 25, monthName: JewishMonth.Kislev, year: 5785 };
    expect(getTzomInfo(jewishDate)).toBeUndefined();
  });

  it("should return undefined for a non-fast day in a month that holds a fast", () => {
    const jewishDate = { day: 1, monthName: JewishMonth.Tishri, year: 5785 };
    expect(getTzomInfo(jewishDate)).toBeUndefined();
  });
});
