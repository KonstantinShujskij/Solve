import React from 'react'

import { BASE_URL, ICONS } from '../const'

import useAuth from '../hooks/auth.hook'


function SocialSection({className}) {
    const { login } = useAuth()

    const googleHandler = () => {
        window.authenticateCallback = function(token, userId) { login(token, userId) }
        window.open(`${BASE_URL}/api/auth/google`)
    }

    return (
        <div className={className}>
            <div className='separator'>
                <span className='separator__text text'>Або увійти за допомогою</span>
            </div>
            <div className='card'>
                <div className='social'>
                    <div className='social__item social__facebook'>
                        <span className='icon'>{ICONS.facebook}</span>                        
                    </div>
                    <div className='social__item social__twiter'>
                        <span className='icon'>{ICONS.twiter}</span>                        
                    </div>
                    <div className='social__item social__google' onClick={() => googleHandler()}>
                        <span className='icon'>{ICONS.google}</span>
                    </div>
                    <div className='social__item social__phone'>
                        <span className='icon'>{ICONS.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialSection
