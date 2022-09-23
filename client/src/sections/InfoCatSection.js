import React from 'react'

import Select from '../components/base/Select'


function InfoCatSection({select, callback}) {
    return (
        <>
        <div className='content'>
            <h2 className='title content__title'>Категорії послуг</h2>
            <p className='text'>Додайте декілька категорій послуг, щоб клієнтам було легше вас знайти.</p>
        </div>
        <div className='card mb-auto'>
            <Select {...select.bind} />
            <button className='button w-100 card__button' disabled={!select.cases.length} onClick={callback} >Далі</button>
        </div>  
        </>
    )
}

export default InfoCatSection
