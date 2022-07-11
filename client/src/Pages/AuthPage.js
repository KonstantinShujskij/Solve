import React, { useContext, useEffect, useState } from 'react'

import { AUTH_LOG_SCREEN, AUTH_REG_SCREEN } from '../const'

import AuthContext from '../context/AuthContext'

import useValidationInput from '../hooks/input.hook'
import useHttp from '../hooks/http.hook'
import useMessage from '../hooks/message.hook'



function AuthPage() {
    const auth = useContext(AuthContext);
    const { error, request, clearError } = useHttp()
    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])
    
    const [currentPage, setCurrentPage] = useState(AUTH_LOG_SCREEN)

    const email = useValidationInput('', () => true)
    const password = useValidationInput('', () => true)

    const regLinkHandler = () => setCurrentPage(AUTH_REG_SCREEN)
    const logLinkHandler = () => setCurrentPage(AUTH_LOG_SCREEN)

    const registerHandler = async () => {
        try {
            const form = { email: email.value, password: password.value }
            const data = await request('/api/auth/register', 'POST', {...form});

            auth.login(data.token, data.userId, data.isCompletely);
        } catch(e) { console.log(e) }
    }

    const loginHandler = async () => {
        try {
            const form = { email: email.value, password: password.value }
            const data = await request('/api/auth/login', 'POST', {...form})

            auth.login(data.token, data.userId, data.isCompletely)
        } catch(e) { console.log(e) }
    }

    const googleHandler = () => {
        window.authenticateCallback = function(token, id, isCompletely) { 
            auth.login(token, id, isCompletely) 
        }

        window.open('http://localhost:5000/api/auth/google')
    }

    return (
        <div className="auth">
        {currentPage === AUTH_LOG_SCREEN && <>
            <div className='mt-auto'></div>
            <input className='input' placeholder='e-mail' {...email.bind} />
            <input className='input' placeholder='Пароль' type="password" {...password.bind} />
            <div className='buttons'>
                <button className='btn' onClick={() => googleHandler()}>Увійти за допомогою Google</button>
                <button className='btn' onClick={() => loginHandler()}>Увійти</button>
            </div>
            <div className='text'>ще немає облікового запису? <span className='text__link' onClick={ regLinkHandler }>створити</span></div>
        </>} 
        {currentPage === AUTH_REG_SCREEN && <>
            <div className='mt-auto'></div>
            <input className='input' placeholder='e-mail' {...email.bind} />
            <input className='input' placeholder='Пароль' type="password" {...password.bind} />
            <div className='buttons'>
                <button className='btn' onClick={() => googleHandler()}>Увійти за допомогою Google</button>
                <button className='btn' onClick={() => registerHandler()}>Створити аккаунт</button>
            </div>
            <div className='text'>Вже маєте аккаунт? <span className='text__link' onClick={ logLinkHandler }>Увійти</span></div>
        </>}
        </div>
    );
}

export default AuthPage;
