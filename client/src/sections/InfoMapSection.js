import React from 'react'


function InfoMapSection({elem, callback}) {
    return (
        <>
        <div className='content'>
            <h2 className='title content__title'>Як вас знайти?</h2>
            <p className='text'>Позначте свій сервісний центр на мапі</p>
        </div>
        <div className='card mb-auto'>
            <div className='map-wrap'>
                <div ref={elem} className='map'></div>
            </div>
            <button className='button w-100 card__button' onClick={ callback }>Далі</button>
        </div>  
        </>
    )
}

export default InfoMapSection
