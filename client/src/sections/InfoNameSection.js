import React from 'react'

import { FRONT_URL } from '../const'

import Input from '../components/base/Input'


function InfoNameSection({name, callback}) {
    return (
        <>
        <div className='content'>
            <h2 className='title content__title'>Приємно познайомитись!</h2>
            <p className='text'>Вкажіть, будь ласка, своє ім’я</p>
        </div>
        <div className='seal client-seal'>
            <img className='seal__image' src={`${FRONT_URL}/images/client.png`} alt="seal" />
        </div>
        <div className='card mb-auto'>
            <Input input={name.bind} label="Имя"></Input>
            <button className='button w-100 card__button' disabled={!name.value} onClick={callback}>Далі</button>
        </div>
        </>
    )
}

export default InfoNameSection
