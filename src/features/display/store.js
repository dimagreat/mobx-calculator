import { observable, action } from 'mobx';

import { DOT } from '../buttons';
import { calcOperation, isNumeric, handleNegative } from './utils';

const MAX_DIGITS = 8;

class DisplayStore {

  @observable display = '0';
  @observable operation = '';
  @observable cache = '';
  @observable isError = false;
  @observable isSwitchedOn = true;
  @observable isNegative = false;
  @observable isMemory = false;
  @observable memory = 0;

  isInitialDisplay = true;

  init() {
    this.isInitialDisplay = true;
    this.display = '0';
    this.operation = '';
    this.cache = '';
    this.isError = false;
    this.isNegative = false;
  }

  @action clearDisplay() {
    this.init();
  }

  @action switchOn() {
    this.isSwitchedOn = true;
    this.init();
    this.clearMemory();
  }

  @action switchOff() {
    this.isSwitchedOn = false;
  }

  @action addMemory() {
    if (!this.isMemory) {
      this.isMemory = true;
    }
    this.memory += Number(handleNegative(this.display, this.isNegative))
  }

  @action reduceMemory() {
    if (!this.isMemory) {
      this.isMemory = true;
    }
    this.memory -= Number(handleNegative(this.display, this.isNegative))
  }

  @action getMemory() {
    if (!this.isMemory) {
      return;
    }
    this.updateDisplay(this.memory);
  }

  @action clearMemory() {
    this.memory = 0;
    this.isMemory = false;
  }

  @action typeDigit(digit) {
    const isOverRange = this.display.length === MAX_DIGITS;
    const isDuplicateZero = digit === '0' && this.display === '0';
    const isDuplicateDot = digit === DOT && this.display.includes(DOT);
    if (
        !this.isSwitchedOn || (isOverRange && !this.isInitialDisplay) ||
        isDuplicateDot || isDuplicateZero
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

  @action addOperation(operation) {
    if (!this.isSwitchedOn) {
      return;
    }
    this.operation = operation;
    this.cache = handleNegative(this.display, this.isNegative);
    this.isInitialDisplay = true;
  }

  getValidated (value) {
    let result = value.toString();
    if (!isNumeric(value)) {
      this.isError = true;
      return '0'
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
      result = result.slice(0, 8)
    }

    return result;
  }

  updateDisplay(value) {
    this.display = this.getValidated(Number(value));
    this.cache = '';
    this.operation = '';
    this.isInitialDisplay = true;
  }

  @action showResult() {
    const second =  Number(handleNegative(this.display, this.isNegative));
    const result = calcOperation(Number(this.cache), second, this.operation);
    this.updateDisplay(result);
  }

  @action getSqrt() {
    const result = Math.sqrt(Number(this.display));
    this.updateDisplay(result.toString());
  }

  @action getPercentage() {
    const first = Number(this.cache);
    const second = Number(handleNegative(this.display, this.isNegative));
    const percent = first * (second / 100);
    const result = calcOperation(first, percent, this.operation);
    this.updateDisplay(result);
  }

  @action plusMinus() {
    this.isNegative = !this.isNegative;
  }

}

export default new DisplayStore();