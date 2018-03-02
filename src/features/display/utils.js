// @flow
import { DIVIDE, MINUS, MULT, PLUS } from '../buttons';

export function isNumeric(n: number): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function calcOperation(first: number, second: number, operation: string): string {
  if (!isNumeric(first) || !isNumeric(second)) {
    return '0';
  }
  let result: number = 0;
  if (operation === PLUS) {
    result = first + second;
  }
  if (operation === MINUS) {
    result = first - second;
  }
  if (operation === MULT) {
    result = first * second;
  }
  if (operation === DIVIDE) {
    result = first / second;
  }
  return result.toString();
}

export function handleNegative(value: string, isNegative: boolean): string {
  return isNegative ? `-${value}` : value;
}
