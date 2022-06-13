import { merge } from '@utils';

describe("test math utils", () => {
  it("test merge", () => {
    expect(merge({a:1, c:3}, {a:2,b:1})).toEqual({a:2,b:1,c:3});
  })
});
