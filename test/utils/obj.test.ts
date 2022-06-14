import { merge } from "@utils/obj";

describe("test obj utils", () => {
  it("test merge", () => {
    expect(merge({ a: 1, c: 3 }, { a: 2, b: 1 })).toEqual({ a: 2, b: 1, c: 3 });
  });
  it("test empty merge", () => {
    expect(merge(undefined, undefined)).toEqual({});
  });
});
