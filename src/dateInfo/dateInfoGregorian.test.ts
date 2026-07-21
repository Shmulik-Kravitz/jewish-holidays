import { toJewishDate } from "jewish-date";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getDateInfo, getTodayInfo } from ".";
import type { DateInfo } from "../interfaces";

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
      holidays: ["Rosh Hashanah"],
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

  it("should summarize October 6, 2024 as a fast day (Tzom Gdalia)", () => {
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
      holidays: [],
    };
    expect(getDateInfo(date)).toStrictEqual(expected);
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
});
