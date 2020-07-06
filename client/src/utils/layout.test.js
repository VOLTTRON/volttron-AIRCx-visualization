import { createPadding } from "./layout";

describe("layout.createPadding()", () => {
  it("should not move item", () => {
    expect(createPadding([5], -10, 10, 5)).toEqual([5]);
  });
  it("should not move items", () => {
    expect(createPadding([5, 10], -10, 10, 5)).toEqual([5, 10]);
  });
  it("should move items outwards", () => {
    expect(createPadding([5, 7], -10, 10, 5)).toEqual([5, 10]);
  });
  it("should move items downwards", () => {
    expect(createPadding([5, 7, 11], -10, 10, 5)).toEqual([0, 5, 10]);
  });
  it("should move items upwards", () => {
    expect(createPadding([-13, -5, -7], -10, 10, 5)).toEqual([-10, 0, -5]);
  });
});
