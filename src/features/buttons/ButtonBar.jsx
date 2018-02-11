import React from 'react';
import { inject, observer } from 'mobx-react'

import * as constants from './constants';
import './ButtonBar.css';

@inject('displayStore')
@observer
class UpdateBar extends React.Component {
    render() {
        const { displayStore } = this.props;
        return (
            <div className='btn-bar'>
                <div className='row'>
                    <div className='modelName'>
                        SL-300SV
                    </div>
                    <div>
                        <button className='btn'
                            onClick={() => displayStore.getSqrt()} >
                            {constants.SQRT}
                        </button>
                        <button className='btn'
                            onClick={() => displayStore.switchOff()} >
                            {constants.OFF }
                        </button>
                    </div>
 
                </div>
                <div className='row'>
                    <button className='btn'
                            onClick={() => {}} >
                            MC
                    </button>
                    <button className='btn'
                            onClick={() => {}} >
                            MR
                    </button>
                    <button className='btn'
                            onClick={() => {}} >
                            M-
                    </button>
                    <button className='btn'
                            onClick={() => {}} >
                            M+
                    </button>
                    <button className='btn'
                            onClick={() => displayStore.addOperation(constants.DIVIDE)} >
                            { constants.DIVIDE }
                    </button>
                </div>
                <div className='row'>
                    <button className='btn'
                            onClick={() => displayStore.getPercentage()} >
                            { constants.PERCENT }
                    </button>
                    {
                        ['7', '8', '9'].map((digit, index) => (
                            <button className='btn'
                                    onClick={() => displayStore.typeDigit(digit)} >
                                { digit }
                            </button>
                        ))
                    }
                    <button className='btn'
                            onClick={() => displayStore.addOperation(constants.MULT)} >
                            { constants.MULT }
                    </button>
                </div>
                <div className='row'>
                    <button className='btn'
                            onClick={() => displayStore.plusMinus()} >
                            { constants.PLUSMINUS }
                    </button>
                    {
                        ['4', '5', '6'].map((digit, index) => (
                            <button className='btn'
                                    onClick={() => displayStore.typeDigit(digit)} >
                                { digit }
                            </button>
                        ))
                    }
                    <button className='btn'
                            onClick={() => displayStore.addOperation(constants.MINUS)} >
                            { constants.MINUS }
                    </button>
                </div>
                <div className='row'>
                    <button className='btn red'
                            onClick={() => displayStore.clearDisplay()} >
                            { constants.CLEAR }
                    </button>
                    {
                        ['1', '2', '3'].map((digit, index) => (
                            <button className='btn'
                                    onClick={() => displayStore.typeDigit(digit)} >
                                { digit }
                            </button>
                        ))
                    }
                    <button className='btn big'
                            onClick={() => displayStore.addOperation(constants.PLUS)} >
                            { constants.PLUS }
                    </button>
                </div>
                <div className='row'>
                    <div className='switchOn'>
                        <button className='btn red'
                                onClick={() => displayStore.switchOn()} >
                                { constants.ON }
                        </button>
                        <span>on</span>
                    </div>

                    {
                        ['0', '.'].map((digit, index) => (
                            <button className='btn'
                                    onClick={() => displayStore.typeDigit(digit)} >
                                { digit }
                            </button>
                        ))
                    }
                    <button className='btn'
                            onClick={() => displayStore.showResult()} >
                            { constants.RESULT }
                    </button>
                </div>
            </div>
        )
    }
}

export default UpdateBar;
