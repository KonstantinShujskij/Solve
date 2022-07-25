import React from 'react'
import { BASE_URL } from '../const'
import useValidationInput from '../hooks/input.hook'
import useAuth from '../hooks/auth.hook'
import useApi from '../hooks/api.hook'
import Input from '../components/base/Input'
import { useNavigate } from 'react-router-dom'

function AuthPage() {
    const { loginUser } = useApi()
    const { login } = useAuth()
    const navigate = useNavigate()
   
    const email = useValidationInput('')
    const password = useValidationInput('')

    const authHandler = async () => {
        const form = { email: email.value, password: password.value }
        const data = await loginUser({...form})
        console.log(data)
        if(data) { login(data.token, data.userId) }
        
    }

    const googleHandler = () => {
        window.authenticateCallback = function(token, userId) { login(token, userId) }
        window.open(`${BASE_URL}/api/auth/google`)
    }

    return (
        <div className="auth">
            <div className='mt-auto'></div>

            <Input input={email.bind} label='e-mail'></Input>
            <br />
            <Input input={password.bind} type='password' label='Пароль'></Input>
            <br />

            <div className='buttons-row'>
                <button className='btn buttons-row__btn' onClick={() => googleHandler()}>Продолжить за допомогою Google</button>
                <button className='btn buttons-row__btn' onClick={() => authHandler()}>Продолжить</button>
            </div>
            <div>Заходя в приложение вы соглашаетесь с <span className='link'>пользовательским соглашением</span></div>
        </div>
    );
}

export default AuthPage;
