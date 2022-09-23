import React from 'react'

import FileLoader from '../components/FileLoader'

function InfoPhotoSection({images, callback}) {
    return (
        <>
        <div className='content'>
            <h2 className='title content__title'>Файна вітрина</h2>
            <p className='text'>Додайте найкращі фото свого сервісного центру, або власні</p>
        </div>
        <div className='card mb-auto'>
            <FileLoader {...images.bind}></FileLoader>
            <button className='button w-100 card__button' onClick={callback}>Далі</button>
        </div>
        </>
    )
}

export default InfoPhotoSection
