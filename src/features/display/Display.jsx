import React from 'react';
import { inject, observer } from 'mobx-react';

import './Display.css'

@inject('displayStore')
@observer
class Display extends React.Component {
    render() {
        const { displayStore } = this.props;
        return (
            <div className='wrapper'>
                <div className='displayWrapper'>
                    <div className='display'>
                        {displayStore.isSwitchedOn && displayStore.display}
                    </div>                
                </div>
            </div>
        )
    }

}

export default Display;
