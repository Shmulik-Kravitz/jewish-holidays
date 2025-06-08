import { describe, expect, it } from "vitest";
import { isCholHaMoed } from ".";

describe("chol HaMoed validation by Gregorian Date", () => {
  it("should return true for Chol HaMoed on October 18, 2024 ", () => {
    const result = isCholHaMoed(new Date(2024, 9, 18));
    expect(result).toStrictEqual(true);
  });

  it("should return false for Chol HaMoed on October 18, 2024 in Chutz Laaretz", () => {
    const result = isCholHaMoed(new Date(2024, 9, 18), true);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Chol HaMoed on October 19, 2024 in Chutz Laaretz", () => {
    const result = isCholHaMoed(new Date(2024, 9, 19), true);
    expect(result).toStrictEqual(true);
  });

  it("should return true for Chol HaMoed on April 14, 2025", () => {
    const result = isCholHaMoed(new Date(2025, 3, 14));
    expect(result).toStrictEqual(true);
  });

  it("should return false for Chol HaMoed on April 14, 2025 in Chutz Laaretz", () => {
    const result = isCholHaMoed(new Date(2025, 3, 14), true);
    expect(result).toStrictEqual(false);
  });

  it("should return true for Chol HaMoed on April 15, 2025 in Chutz Laaretz", () => {
    const result = isCholHaMoed(new Date(2025, 3, 15), true);
    expect(result).toStrictEqual(true);
  });
});
