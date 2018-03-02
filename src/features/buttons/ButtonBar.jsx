// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { IDisplayStore } from '../display';

import * as constants from './constants';
import './ButtonBar.css';

type Props = {
  displayStore: IDisplayStore,
};

type UpdateAction = (param?: string) => void;

type Row = Map<string, UpdateAction>;

@inject('displayStore')
@observer
class UpdateBar extends React.Component<Props> {
  createButton(title: string, action: UpdateAction, key: number) {
    return (
      // TODO Update with class adding
      <button className="btn" key={key} onClick={action}>
        {title}
      </button>
    );
  }

  renderRow(row: Row) {
    const result = [];
    let index = 0;
    for (let [key, value] of row) {
      result.push(this.createButton(key, value, index++));
    }
    return result;
  }

  render() {
    const { displayStore } = this.props;

    const firstRow: Row = new Map([
      [constants.SQRT, () => displayStore.getSqrt()],
      [constants.OFF, () => displayStore.switchOff()],
    ]);

    const secondRow: Row  = new Map([
      [constants.MEMORY_CLR, () => displayStore.clearMemory()],
      [constants.MEMORY_RETURN, () => displayStore.getMemory()],
      [constants.MEMORY_MINUS, () => displayStore.reduceMemory()],
      [constants.MEMORY_PLUS, () => displayStore.addMemory()],
      [constants.DIVIDE, () => displayStore.addOperation(constants.DIVIDE)],
    ]);

    const thirdRow: Row  = new Map([
      [constants.PERCENT, () => displayStore.getPercentage()],
      ['7', () => displayStore.typeDigit('7')],
      ['8', () => displayStore.typeDigit('8')],
      ['9', () => displayStore.typeDigit('9')],
      [constants.MULT, () => displayStore.addOperation(constants.MULT)],
    ]);

    const fourthRow: Row  = new Map([
      [constants.PLUSMINUS, () => displayStore.plusMinus()],
      ['4', () => displayStore.typeDigit('4')],
      ['5', () => displayStore.typeDigit('5')],
      ['6', () => displayStore.typeDigit('6')],
      [constants.MINUS, () => displayStore.addOperation(constants.MINUS)],
    ]);

    const fifthRow: Row  = new Map([
      ['1', () => displayStore.typeDigit('1')],
      ['2', () => displayStore.typeDigit('2')],
      ['3', () => displayStore.typeDigit('3')],
    ]);

    const sixRow: Row  = new Map([
      ['0', () => displayStore.typeDigit('0')],
      [constants.DOT, () => displayStore.typeDigit(constants.DOT)],
      [constants.RESULT, () => displayStore.showResult()],
    ]);

    return (
      <div className="btn-bar">
        <div className="row firstRow">
          <div className="modelName">SL-300SV</div>
          <div>{this.renderRow(firstRow)}</div>
        </div>
        <div className="row">{this.renderRow(secondRow)}</div>
        <div className="row">{this.renderRow(thirdRow)}</div>
        <div className="row">{this.renderRow(fourthRow)}</div>
        <div className="row">
          <button className="btn red" onClick={() => displayStore.clearDisplay()}>
            {constants.CLEAR}
          </button>
          {this.renderRow(fifthRow)}
          <button className="btn big" onClick={() => displayStore.addOperation(constants.PLUS)}>
            {constants.PLUS}
          </button>
        </div>
        <div className="row">
          <div className="switchOn">
            <button className="btn red" onClick={() => displayStore.switchOn()}>
              {constants.ON}
            </button>
            <div>on</div>
          </div>
          {this.renderRow(sixRow)}
        </div>
      </div>
    );
  }
}

export default UpdateBar;
