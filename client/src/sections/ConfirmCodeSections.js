import React from 'react'

import { FRONT_URL } from '../const'

import Code from '../components/Code'


function ConfirmCodeSection({phone, code, callback}) {
    return (
        <>
        <div className='content'>
            <h2 className='title content__title'>Код підтвердження</h2>
            <p className='text'>Код підтвердження відправлено по номеру {phone}</p>
        </div>
        <div className='seal code-seal'>
            <img className='seal__image' src={`${FRONT_URL}/images/code.png`} alt="seal" />
        </div>
        <div className='card mb-auto'>            
            <Code code={code} />
            <button className='button w-100 card__button' onClick={callback}>Далі</button>
            <div className='card__space'></div>
            <div className='link'>Не прийшов код?</div>
        </div>
        </>
    )
}

export default ConfirmCodeSection
