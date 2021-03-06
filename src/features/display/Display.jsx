// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { IDisplayStore } from './store';

import './Display.css';

type Props = {
  displayStore: IDisplayStore,
};

@inject('displayStore')
@observer
class Display extends React.Component<Props> {
  render() {
    const { displayStore } = this.props;
    const error = displayStore.isError && <span className="error displayItem">E</span>;
    const negative = displayStore.isNegative && <span className="minus displayItem">-</span>;
    const memory = displayStore.isMemory && <span className="memory displayItem">M</span>;

    const display = displayStore.isSwitchedOn ? (
      <div>
        {memory}
        {negative}
        {error}
        {displayStore.display}
      </div>
    ) : (
      ''
    );
    return (
      <div className="wrapper">
        <div className="display">{display}</div>
      </div>
    );
  }
}

export default Display;
