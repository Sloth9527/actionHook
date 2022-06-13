export function isPositiveOrZero(n: any): boolean {
  const num = parseFloat(n);
  return num >= 0;
}

export function addByStep(num: any = 0, step: 1 | -1): number {
  const res = isPositiveOrZero(num) ? num + step : step;
  return isPositiveOrZero(res) ? res : 0;
}
