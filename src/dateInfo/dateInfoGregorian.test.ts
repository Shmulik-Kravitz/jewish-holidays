import { toJewishDate } from "jewish-date";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { DateInfo } from "../interfaces";
import { getDateInfo, getTodayInfo } from ".";

describe("getDateInfo by Gregorian Date", () => {
  it("should summarize October 3, 2024 as Rosh Hashanah", () => {
    const date = new Date(2024, 9, 3);
    const expected: DateInfo = {
      jewishDate: toJewishDate(date),
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
    expect(getDateInfo(date)).toStrictEqual(expected);
  });

  it("should summarize a Saturday as Shabbat", () => {
    const date = new Date(2023, 9, 21); // A Saturday
    const expected: DateInfo = {
      jewishDate: toJewishDate(date),
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: true,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: false,
      holidays: [],
    };
    expect(getDateInfo(date)).toStrictEqual(expected);
  });

  it("should summarize October 6, 2024 as a fast day (Tzom Gdalia), postponed", () => {
    const date = new Date(2024, 9, 6);
    const expected: DateInfo = {
      jewishDate: toJewishDate(date),
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: true,
      tzom: { name: "Tzom Gdalia", shift: "postponed" },
      holidays: ["Tzom Gdalia"],
    };
    expect(getDateInfo(date)).toStrictEqual(expected);
  });

  it("should summarize March 21, 2024 as Taanit Esther, advanced", () => {
    const date = new Date(2024, 2, 21);
    const expected: DateInfo = {
      jewishDate: toJewishDate(date),
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
    expect(getDateInfo(date)).toStrictEqual(expected);
  });

  it("should summarize March 24, 2024 as Purim and not a fast", () => {
    const date = new Date(2024, 2, 24);
    const expected: DateInfo = {
      jewishDate: toJewishDate(date),
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: true,
      isTzom: false,
      holidays: ["Purim"],
    };
    expect(getDateInfo(date)).toStrictEqual(expected);
  });

  it("should summarize April 10, 2025 as Taanit Bechorot, advanced", () => {
    const date = new Date(2025, 3, 10);
    const expected: DateInfo = {
      jewishDate: toJewishDate(date),
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: true,
      tzom: { name: "Taanit Bechorot", shift: "advanced" },
      holidays: ["Taanit Bechorot"],
    };
    expect(getDateInfo(date)).toStrictEqual(expected);
  });

  it("should summarize April 12, 2025 (Shabbat erev Pesach) as not a fast", () => {
    const date = new Date(2025, 3, 12);
    const info = getDateInfo(date);
    expect(info.isTzom).toStrictEqual(false);
    expect(info.tzom).toBeUndefined();
    expect(info.holidays).toStrictEqual([]);
  });

  it("should summarize October 12, 2024 as Yom Kippur, listed once", () => {
    const date = new Date(2024, 9, 12);
    const expected: DateInfo = {
      jewishDate: toJewishDate(date),
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
    expect(getDateInfo(date)).toStrictEqual(expected);
  });

  it("should summarize July 22, 2029 as Tisha BeAv, postponed", () => {
    const date = new Date(2029, 6, 22);
    const info = getDateInfo(date);
    expect(info.tzom).toStrictEqual({ name: "Tisha BeAv", shift: "postponed" });
    expect(info.holidays).toStrictEqual(["Tisha BeAv"]);
  });

  it("should summarize July 1, 2029 as Shiva Asar BeTamuz, postponed", () => {
    const date = new Date(2029, 6, 1);
    const info = getDateInfo(date);
    expect(info.tzom).toStrictEqual({
      name: "Shiva Asar BeTamuz",
      shift: "postponed",
    });
    expect(info.holidays).toStrictEqual(["Shiva Asar BeTamuz"]);
  });

  it("should summarize March 15, 2025 as Shushan Purim, not Purim", () => {
    const date = new Date(2025, 2, 15);
    const expected: DateInfo = {
      jewishDate: toJewishDate(date),
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: true,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: true,
      isTzom: false,
      holidays: ["Shushan Purim"],
    };
    expect(getDateInfo(date)).toStrictEqual(expected);
  });

  it("should summarize March 4, 2026 as Shushan Purim", () => {
    const info = getDateInfo(new Date(2026, 2, 4));
    expect(info.isPurim).toStrictEqual(true);
    expect(info.holidays).toStrictEqual(["Shushan Purim"]);
  });

  it("should summarize a plain weekday with all flags false", () => {
    const date = new Date(2024, 9, 15);
    const expected: DateInfo = {
      jewishDate: toJewishDate(date),
      isYomTov: false,
      isErevYomTov: false,
      isCholHaMoed: false,
      isShabbat: false,
      isErevShabbat: false,
      isRoshChodesh: false,
      isChanukah: false,
      isPurim: false,
      isTzom: false,
      holidays: [],
    };
    expect(getDateInfo(date)).toStrictEqual(expected);
  });
});

describe("getTodayInfo", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should summarize today's date, delegating to getDateInfo", () => {
    const today = new Date(2024, 9, 3); // Rosh Hashanah
    vi.useFakeTimers();
    vi.setSystemTime(today);

    expect(getTodayInfo()).toStrictEqual(getDateInfo(today));
  });

  it("should forward the isChutzLaaretz flag", () => {
    const today = new Date(2024, 9, 3);
    vi.useFakeTimers();
    vi.setSystemTime(today);

    expect(getTodayInfo(true)).toStrictEqual(getDateInfo(today, true));
  });

  it("should forward the language", () => {
    const today = new Date(2024, 9, 3);
    vi.useFakeTimers();
    vi.setSystemTime(today);

    expect(getTodayInfo(false, "he")).toStrictEqual(
      getDateInfo(today, false, "he"),
    );
    expect(getTodayInfo(false, "he").holidays).toStrictEqual([
      "ראש השנה",
      "ראש חודש",
    ]);
  });
});
