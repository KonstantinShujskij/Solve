import React from 'react'

import { FRONT_URL, ICONS } from '../const'

import Input from '../components/base/Input'


function InfoPhoneSection({phone, callback}) {
    return (
        <>
        <div className='content'>
            <h2 className='title content__title'>Телефон</h2>
            <p className='text'>Ваш телефон</p>
        </div>
        <div className='seal write-seal'>
            <img className='seal__image' src={`${FRONT_URL}/images/write.png`} alt="seal" />
        </div>
        <div className='card mb-auto'>
            <Input input={phone.bind} icon={ICONS.mobile} label='Телефон' ></Input>
            <button className='button w-100 card__button' disabled={!phone.value} onClick={callback}>Далі</button>
        </div>
        </>
    )
}

export default InfoPhoneSection
