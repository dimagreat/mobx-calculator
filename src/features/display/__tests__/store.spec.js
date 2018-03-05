import store from '../store';

describe('store', () => {
  beforeEach(() => {
    store.init();
  });

  it('should return default', () => {
    expect(store.display).toBe('0');
    expect(store.isError).toBe(false);
    expect(store.isSwitchedOn).toBe(true);
    expect(store.isNegative).toBe(false);
    expect(store.isMemory).toBe(false);
  });

  it('should switch on/off', () => {
    store.switchOff();
    expect(store.isSwitchedOn).toBe(false);
    store.switchOn();
    expect(store.isSwitchedOn).toBe(true);
  });

  it('should type digit', () => {
    store.typeDigit('5');
    expect(store.display).toBe('5');
    store.typeDigit('1');
    expect(store.display).toBe('51');
    store.typeDigit('.');
    expect(store.display).toBe('51.');
    store.typeDigit('5');
    expect(store.display).toBe('51.5');
  });

  it('should clear display', () => {
    store.typeDigit('5123');
    expect(store.display).toBe('5123');
    store.clearDisplay();
    expect(store.display).toBe('0');
  });

  it('should perform operation', () => {
    store.typeDigit('2');
    store.addOperation('+');
    store.typeDigit('2');
    store.showResult();
    expect(store.display).toBe('4');
  });

  it('should get sqrt', () => {
    store.typeDigit('4');
    store.getSqrt();
    expect(store.display).toBe('2');
  });

  it('should get percentage', () => {
    store.typeDigit('100');
    store.addOperation('+');
    store.typeDigit('20');
    store.getPercentage();
    expect(store.display).toBe('120');
  });

  it('should set negative value', () => {
    store.plusMinus();
    expect(store.isNegative).toBe(true);
  });
});
