import React from 'react';
import { inject, observer } from 'mobx-react';

import './Display.css'

@inject('displayStore')
@observer
class Display extends React.Component {
    render() {
        const { displayStore } = this.props;
        const error = <span className='error'>E</span>;
        return (
            <div className='wrapper'>
                <div className='display'>
                    {(displayStore.isSwitchedOn && displayStore.isError) && error}
                    {displayStore.isSwitchedOn && displayStore.display}
                </div>                
            </div>
        )
    }

}

export default Display;
