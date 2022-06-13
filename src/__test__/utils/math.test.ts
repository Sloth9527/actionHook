import {
  isPositiveOrZero,
  addByStep,
} from '@utils';

describe("test math utils", () => {
  it('test isPositiveOrZero', () => {
    expect(isPositiveOrZero(0)).toBeTruthy();
    expect(isPositiveOrZero(1)).toBeTruthy();
    expect(isPositiveOrZero(-1)).toBeFalsy();
    expect(isPositiveOrZero(NaN)).toBeFalsy();
  });

  it('test addByStep', () => {
    expect(addByStep(0, 1)).toBe(1);
    expect(addByStep(1, 1)).toBe(2);
    expect(addByStep(1, -1)).toBe(0);
    expect(addByStep(-1, 1)).toBe(1);
    expect(addByStep(-1, -1)).toBe(0);
  });
})
