import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ICONS } from '../const'


function BackSection({children, className, handler=null}) {
    const navigate = useNavigate()

    const backHandler = () => { 
        if(handler) { handler() }
        else { navigate(-1) }
    }

    return (
        <div className={`top-back ${className}`}>
            <button className='back-button top-back__button' onClick={backHandler}>
                <span className='icon'>{ICONS.back}</span>
            </button>
            {children}
        </div>
    )
}

export default BackSection
