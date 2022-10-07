import React from 'react'
import { Link } from 'react-router-dom'

import useAuth from '../hooks/auth.hook'


function SettingsMenuSection() {
    const { logout } = useAuth()

    return (
        <div className='card'>
            <Link className='button w-100 card__button' to={'/settings/phone'} >Змінити контактний номер</Link>
            <Link className='button w-100 card__button' to={'/settings/social'} >Налаштувати соціальні мережі</Link>
            <button className='button w-100 card__button button-grey' >Повідомити про помилку</button>
            <button className='button w-100 card__button red' onClick={() => logout()}>Вийти з облікового запису</button>
        </div>
    )
}

export default SettingsMenuSection
