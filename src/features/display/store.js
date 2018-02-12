import { observable, action } from 'mobx';

import { DOT, PLUS, MINUS, DIVIDE, MULT } from '../buttons';

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
    this.memory += Number(this.handleNegative(this.display, this.isNegative))
  }

  @action reduceMemory() {
    if (!this.isMemory) {
      this.isMemory = true;
    }
    this.memory -= Number(this.handleNegative(this.display, this.isNegative))
  }

  @action getMemory() {
    if (!this.isMemory) {
      return;
    }
    if (this.memory < 0) {
      this.isNegative = true;
      this.display = Math.abs(this.memory).toString();
      return;
    }
    this.display = this.memory.toString();
  }

  @action clearMemory() {
    this.memory = 0;
    this.isMemory = false;
  }

  @action typeDigit(digit) {
    if (!this.isSwitchedOn) {
      return;
    }
    if (this.display.length === MAX_DIGITS) {
      return;
    }
    if (digit === '0' && this.display === '0') {
      return;
    }
    if (digit === DOT && this.display.includes(DOT)) {
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

  handleNegative (value, isNegative) {
    return isNegative ? `${-value}` : value
  }

  @action addOperation(operation) {
    if (!this.isSwitchedOn) {
      return;
    }
    this.operation = operation;
    this.cache = this.handleNegative(this.display, this.isNegative);
    this.isInitialDisplay = true;
  }

  calcOperation(first, second) {
    if (!first || !second) {
      return;
    }
    let result;
    if (this.operation === PLUS) {
      result = first + second;
    }
    if (this.operation === MINUS) {
      result = first - second;
    }
    if (this.operation === MULT) {
      result = first * second;
    }
    if (this.operation === DIVIDE) {
      result = first / second;
    }
    if (this.operation === DIVIDE) {
      result = first / second;
    }
    return result.toString();
  }

  getValidated (value) {
    let result = value.toString();
    if (!Number.isFinite(value)) {
      this.isError = true;
      result = '0'
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
    const second =  Number(this.handleNegative(this.display, this.isNegative));
    const result = this.calcOperation(Number(this.cache), second);
    this.updateDisplay(result);
  }

  @action getSqrt() {
    const result = Math.sqrt(Number(this.display));
    this.updateDisplay(result.toString());
  }

  @action getPercentage() {
    const first = Number(this.cache);
    const second = Number(this.handleNegative(this.display, this.isNegative));
    const percent = first * (second / 100);
    const result = this.calcOperation(first, percent);
    this.updateDisplay(result);
  }

  @action plusMinus() {
    this.isNegative = !this.isNegative;
  }

}

export default new DisplayStore();