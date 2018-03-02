// @flow

import { action, observable } from 'mobx';

import { DOT } from '../buttons';
import { calcOperation, handleNegative, isNumeric } from './utils';

const MAX_DIGITS = 8;

export interface IDisplayStore {
  display: string;
  isError: boolean;
  isSwitchedOn: boolean;
  isNegative: boolean;
  isMemory: boolean;
  clearDisplay: () => void;
  switchOn: () => void;
  switchOff: () => void;
  addMemory: () => void;
  reduceMemory: () => void;
  getMemory: () => void;
  clearMemory: () => void;
  typeDigit: (digit: string) => void;
  addOperation: (operation: string) => void;
  showResult: () => void;
  getSqrt: () => void;
  getPercentage: () => void;
  plusMinus: () => void;
}

class DisplayStore {
  @observable display: string = '0';
  @observable isError: boolean = false;
  @observable isSwitchedOn: boolean = true;
  @observable isNegative: boolean = false;
  @observable isMemory: boolean = false;

  operation: string = '';
  cache: string = '';
  memory: number = 0;
  isInitialDisplay: boolean = true;

  init() {
    this.isInitialDisplay = true;
    this.display = '0';
    this.operation = '';
    this.cache = '';
    this.isError = false;
    this.isNegative = false;
  }

  @action
  clearDisplay() {
    this.init();
  }

  @action
  switchOn() {
    this.isSwitchedOn = true;
    this.init();
    this.clearMemory();
  }

  @action
  switchOff() {
    this.isSwitchedOn = false;
  }

  @action
  addMemory() {
    if (!this.isMemory) {
      this.isMemory = true;
    }
    this.memory += Number(handleNegative(this.display, this.isNegative));
  }

  @action
  reduceMemory() {
    if (!this.isMemory) {
      this.isMemory = true;
    }
    this.memory -= Number(handleNegative(this.display, this.isNegative));
  }

  @action
  getMemory() {
    if (!this.isMemory) {
      return;
    }
    this.updateDisplay(this.memory.toString());
  }

  @action
  clearMemory() {
    this.memory = 0;
    this.isMemory = false;
  }

  @action
  typeDigit(digit: string) {
    const isOverRange = this.display.length === MAX_DIGITS;
    const isDuplicateZero = digit === '0' && this.display === '0';
    const isDuplicateDot = digit === DOT && this.display.includes(DOT);
    if (
      !this.isSwitchedOn ||
      (isOverRange && !this.isInitialDisplay) ||
      isDuplicateDot ||
      isDuplicateZero
    ) {
      return;
    }
    if (this.isInitialDisplay) {
      this.isError = false;
      this.isNegative = false;
      this.isInitialDisplay = false;
      this.display = digit === DOT ? '0.' : digit;
      return;
    }

    this.display += digit;
  }

  @action
  addOperation(operation: string) {
    if (!this.isSwitchedOn) {
      return;
    }
    this.operation = operation;
    this.cache = handleNegative(this.display, this.isNegative);
    this.isInitialDisplay = true;
  }

  getValidated(value: number) {
    let result = value.toString();
    if (!isNumeric(value)) {
      this.isError = true;
      return '0';
    }
    if (value >= 0) {
      this.isNegative = false;
    }
    if (value < 0) {
      this.isNegative = true;
      result = Math.abs(value).toString();
    }
    if (result.length > MAX_DIGITS) {
      this.isError = true;
      // TODO: Update with dot
      result = result.slice(0, 8);
    }

    return result;
  }

  updateDisplay(value: string) {
    this.display = this.getValidated(Number(value));
    this.cache = '';
    this.operation = '';
    this.isInitialDisplay = true;
  }

  @action
  showResult() {
    const second = Number(handleNegative(this.display, this.isNegative));
    const result = calcOperation(Number(this.cache), second, this.operation);
    this.updateDisplay(result);
  }

  @action
  getSqrt() {
    const result = Math.sqrt(Number(this.display));
    this.updateDisplay(result.toString());
  }

  @action
  getPercentage() {
    if (!this.cache) {
      return;
    }
    const first = Number(this.cache);
    const second = Number(handleNegative(this.display, this.isNegative));
    const percent = first * (second / 100);
    const result = calcOperation(first, percent, this.operation);
    this.updateDisplay(result);
  }

  @action
  plusMinus() {
    this.isNegative = !this.isNegative;
  }
}

export default new DisplayStore();
