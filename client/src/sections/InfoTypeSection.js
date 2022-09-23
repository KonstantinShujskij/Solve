import React from 'react'

import { CLIENT, FRONT_URL, MASTER } from '../const'


function InfoTypeSection({setType, clientCallback, masterCallback}) {

    const clientHandler = () => { setType(CLIENT); clientCallback() }
    const masterHandler = () => { setType(MASTER); masterCallback() }

    return (
        <>
        <div className='content'>
            <h2 className='title content__title'>Тип профілю</h2>
            <p className='text'>Оберіть будь ласка тип профілю</p>
        </div>
        <div className='seal write-seal'>
            <img className='seal__image' src={`${FRONT_URL}/images/write.png`} alt="seal" />
        </div>
        <div className='card mb-auto'>
            <button className='button w-100 card__button' onClick={ clientHandler }>Клієнт</button>
            <button className='button w-100 card__button red' onClick={ masterHandler }>Майстер</button>
        </div>           
        </>
    )
}

export default InfoTypeSection
