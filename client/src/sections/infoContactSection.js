import React from 'react'

import Contacts from '../components/Contacts'


function InfoContactSection({contact, callback}) {
    return (
        <>
        <div className='content'>
            <h2 className='title content__title'>Мессенджер</h2>
            <p className='text'>Оберіть і додайте зручний для вас мессенджер</p>
        </div>
        <div className='card mb-auto'>
            <Contacts {...contact.bind} ></Contacts>
            <button className='button w-100 card__button' onClick={callback}>Завершити реєстрацію</button>
        </div>      
        </>
    )
}

export default InfoContactSection
