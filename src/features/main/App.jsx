import React from 'react';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { Display } from '../display';
import { ButtonBar } from '../buttons';
import { displayStore } from '../display';

import './App.css';

const stores = {
    displayStore,
}

export default function () {
    return (
        <Provider {...stores}>
            <div className='calculator'>
                <div className='header'>
                    <div className='title'>Casio</div>
                    <div className='solarWrapper'>
                        <div className='solar'></div>
                        <div className='solarText'>two way power</div>
                    </div>
                </div>
                <DevTools />
                <Display />
                <ButtonBar />
            </div>
        </Provider>
    )
}
