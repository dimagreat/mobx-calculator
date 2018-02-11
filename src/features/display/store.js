import { observable, action } from 'mobx';

import { PLUS, MINUS, DIVIDE, MULT } from '../buttons';

const MAX_DIGITS = 8;

class DisplayStore {

  @observable display = '0';
  @observable operation = '';
  @observable cache = '';
  @observable isError = false;
  @observable isSwitchedOn = true;
  isInitialDisplay = true;

  init() {
    this.isInitialDisplay = true;
    this.display = '0';
    this.operation = '';
    this.cache = '';
    this.isError = false;
  }

  @action clearDisplay() {
    this.init();
  }

  @action switchOn() {
    this.isSwitchedOn = true;
    this.init();
  }

  @action switchOff() {
    this.isSwitchedOn = false;
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
    if (this.isInitialDisplay) {
      this.isError = false;
      this.isInitialDisplay = false;
      this.display = digit;
      return;
    }

    this.display += digit;
  }

  @action addOperation(operation) {
    if (!this.isSwitchedOn) {
      return;
    }
    this.operation = operation;
    this.cache = this.display;
    this.isInitialDisplay = true;
  }

  calcOperation() {
    if (!this.cache || !this.isSwitchedOn) {
      return;
    }
    let result;
    const first = Number(this.cache);
    const second = Number(this.display);
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

  validate (value) {
    if (!Number.isFinite(value)) {
      this.isError = true;
    }
    if (value.toString().length > MAX_DIGITS) {
      this.isError = true;
    }
  }

  updateDisplay(value) {
    this.validate(Number(value));
    this.display = this.isError ? '0' : value;
    this.cache = '';
    this.operation = '';
    this.isInitialDisplay = true;
  }

  @action showResult() {
    const result = this.calcOperation();
    this.updateDisplay(result);
  }

  @action getSqrt() {
    const result = Math.sqrt(this.display);
    this.updateDisplay(result.toString());
  }

  @action getPercentage() {
    // this.display = this.cache * (this.display / 100);
  }

  @action plusMinus() {
    //
  }

}

export default new DisplayStore();