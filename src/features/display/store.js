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

  getResult() {
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

  validate (display) {
    let isError = false;
    if (!Number.isFinite(display)) {
      isError = true;
    }
    if (display.length > MAX_DIGITS) {
      isError = true;
    }
    return !isError ? display : '0';
  }

  @action showResult() {
    const result = this.getResult();
    if (!result) {
      return;
    }
    this.display = result;
    this.cache = '';
    this.operation = '';
    this.isInitialDisplay = true;
  }

  @action getSqrt() {
    //TODO Fix length!
    this.display = Math.sqrt(this.display);
  }

  @action getPercentage() {
    // this.display = this.cache * (this.display / 100);
  }

  @action plusMinus() {
    //
  }

}

export default new DisplayStore();