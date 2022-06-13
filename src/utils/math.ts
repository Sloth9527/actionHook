export function isPositiveOrZero (num:number) : boolean {
  return typeof num === 'number' && num >= 0;
}

export function addByStep (num=0, step:1|-1):number {
  const res = isPositiveOrZero(num) ? num + step : step;
  return isPositiveOrZero(res) ? res : 0;
}
