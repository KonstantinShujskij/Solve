import React from 'react'

import { ICONS } from '../const'

import useApi from '../hooks/api.hook'
import useAuth from '../hooks/auth.hook'

import useValidationInput from '../hooks/input.hook'

import Input from '../components/base/Input'


function LoginSection() {
    const { loginUser } = useApi()
    const { login } = useAuth()

    const email = useValidationInput('')
    const password = useValidationInput('')

    const authHandler = async () => {
        const form = { email: email.value, password: password.value }
        const {token, userId} = await loginUser({...form})
        login(token, userId)
    }

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Вхід</h2>
                <p className='text'>Увійти щоб Lorem Ipsum Dolorem Sit Amet</p>
            </div>
            
            <div className='card'>
                <Input input={email.bind} icon={ICONS.mail} label='e-mail'></Input>
                <div className='card__space'></div>
                <Input input={password.bind} type='password' icon={ICONS.lock} label='Пароль'></Input>
                <button className='button w-100 card__button' onClick={() => authHandler()}>Увійти</button>
                <p className='link subtext text-center card__subtext'>Забули пароль?</p>
            </div>
        </>
    )
}

export default LoginSection
