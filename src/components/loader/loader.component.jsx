import React from 'react';
import './loader-style.scss'

const Loader = ({text}) => {
    return (
        <div className='loader-container'>
            <div className='loader-content'>
                <h2 className='loader-text'>{text}</h2>
                <div className='loader-circles-container'>
                    <div className='loader-circle'></div>
                    <div className='loader-circle'></div>
                    <div className='loader-circle'></div>
                </div>
            </div>            
        </div>
    )
}

export default Loader;