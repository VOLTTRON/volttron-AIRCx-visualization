import filters from "./filters";

describe("filters.aggregate()", () => {
  // full data
  it("should return okay with 1 fault present", () => {
    expect(filters.aggregate(1, 24 - 1)).toEqual(filters.parse("okay"));
  });

  it("should return okay with 2 faults present", () => {
    expect(filters.aggregate(2, 24 - 2)).toEqual(filters.parse("okay"));
  });

  it("should return okay with 3 faults present", () => {
    expect(filters.aggregate(3, 24 - 3)).toEqual(filters.parse("okay"));
  });

  it("should return okay with 6 faults present", () => {
    expect(filters.aggregate(6, 24 - 6)).toEqual(filters.parse("okay"));
  });

  it("should return fault with 7 faults present", () => {
    expect(filters.aggregate(7, 24 - 7)).toEqual(filters.parse("fault"));
  });

  it("should return fault with 50% faults present", () => {
    expect(filters.aggregate(12, 24 - 12)).toEqual(filters.parse("fault"));
  });

  it("should return fault with 100% faults present", () => {
    expect(filters.aggregate(24, 24 - 24)).toEqual(filters.parse("fault"));
  });

  // inconclusive
  it("should return inconclusive with 5 or less okay present", () => {
    expect(filters.aggregate(0, 5)).toEqual(filters.parse("inconclusive"));
  });

  it("should return inconclusive with 5 or less faults present", () => {
    expect(filters.aggregate(5, 0)).toEqual(filters.parse("inconclusive"));
  });

  it("should return inconclusive with no data", () => {
    expect(filters.aggregate(0, 0)).toEqual(filters.parse("inconclusive"));
  });

  // partial data
  it("should return fault with 1 fault present out of 6 possible", () => {
    expect(filters.aggregate(1, 6 - 1)).toEqual(filters.parse("fault"));
  });

  it("should return fault with 1 fault present out of 7 possible", () => {
    expect(filters.aggregate(1, 7 - 1)).toEqual(filters.parse("fault"));
  });

  it("should return fault with 1 fault present out of 8 possible", () => {
    expect(filters.aggregate(1, 8 - 1)).toEqual(filters.parse("fault"));
  });

  it("should return okay with 1 fault present out of 9 possible", () => {
    expect(filters.aggregate(1, 9 - 1)).toEqual(filters.parse("okay"));
  });

  it("should return fault with 50% faults present out of 10 possible", () => {
    expect(filters.aggregate(5, 10 - 5)).toEqual(filters.parse("fault"));
  });

  it("should return fault with 100% faults present out of 9 possible", () => {
    expect(filters.aggregate(9, 9 - 9)).toEqual(filters.parse("fault"));
  });

  // big numbers
  it("should return okay with 25% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.25, 10000 - 10000 * 0.25)).toEqual(
      filters.parse("okay")
    );
  });

  it("should return fault with 50% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.5, 10000 - 10000 * 0.5)).toEqual(
      filters.parse("fault")
    );
  });

  it("should return fault with 75% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000 * 0.75, 10000 - 10000 * 0.75)).toEqual(
      filters.parse("fault")
    );
  });

  it("should return fault with 100% faults present out of 10,000 possible", () => {
    expect(filters.aggregate(10000, 10000 - 10000)).toEqual(
      filters.parse("fault")
    );
  });
});
