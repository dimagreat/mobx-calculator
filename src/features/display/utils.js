import { DIVIDE, MINUS, MULT, PLUS } from '../buttons';

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function calcOperation(first, second, operation) {
  if (!isNumeric(first) || !isNumeric(second)) {
    return '0';
  }
  let result;
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

export function handleNegative(value, isNegative) {
  return isNegative ? `${-value}` : value
}
