import React from 'react'

import { FRONT_URL, ICONS } from '../const'


function BackSection({className, handler}) {
    return (
        <div className={`top-back ${className}`}>
            <button className='back-button top-back__button' onClick={handler}>
                <span className='icon'>{ICONS.back}</span>
            </button>
            <div className='logo top-back__logo'>
                <img src={`${FRONT_URL}/images/logo.svg`} className='logo__image' alt='logo' />
            </div>
        </div>
    )
}

export default BackSection
