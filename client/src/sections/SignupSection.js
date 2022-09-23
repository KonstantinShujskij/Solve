import React from 'react'

import { ICONS } from '../const'

import useApi from '../hooks/api.hook'
import useAuth from '../hooks/auth.hook'

import useValidationInput from '../hooks/input.hook'

import Input from '../components/base/Input'

function SignupSection() {
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
                <h2 className='title content__title'>Створення аккаунту</h2>
                <p className='text'>Створити аккаунт щоб Lorem Ipsum Dolorem Sit Amet</p>
            </div>

            <div className='card'>
                <Input input={email.bind} icon={ICONS.mail} label='e-mail'></Input>
                <div className='card__space'></div>
                <Input input={password.bind} type='password' icon={ICONS.lock} label='Пароль'></Input>
                <button className='button w-100 card__button' onClick={() => authHandler()}>Зареєструватися</button>
                
                <p className='subtext text-center card__subtext'>
                    Реєструючись ви погоджуєтеся з <span className='link'>Умовами обслуговування</span>
                    та<span className='link'>Політикою конфіденційності</span>
                </p>
            </div>
        </>
    )
}

export default SignupSection
