import React from 'react'

import { FRONT_URL } from '../const'

import Input from '../components/base/Input'


function InfoTitleSection({name, callback}) {
    return (
        <>
        <div className='content'>
            <h2 className='title content__title'>З якої ви компанії?</h2>
            <p className='text'>Вкажіть, будь ласка,назву своєї компанії. Якщо немає, то свої ім’я та прізвище.</p>
        </div>
        <div className='seal company-seal'>
            <img className='seal__image' src={`${FRONT_URL}/images/company.png`} alt="seal" />
        </div>
        <div className='card mb-auto'>
            <Input input={name.bind} label="Назва компанії"></Input>
            <button className='button w-100 card__button' disabled={!name.value} onClick={callback}>Далі</button>
        </div>
        </>
    )
}

export default InfoTitleSection
