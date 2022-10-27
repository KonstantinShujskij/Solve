import React, { useState } from 'react'
import useApi from '../hooks/api.hook';
import useAuth from '../hooks/auth.hook';
import useUser from '../hooks/user.hook';
import useAlert from '../hooks/alert.hook';
import useValidationInput from '../hooks/input.hook'
import BackSection from '../sections/BackSection';
import ConfirmPhoneSection from '../sections/ConfirmPhoneSection';
import ConfirmCodeSection from '../sections/ConfirmCodeSections';
import * as validators from '../validators'


function ConfirmPage() {
    const { changePhone, confirmPhone } = useApi()
    const { logout } = useAuth()
    const { pushMess } = useAlert()
    const { refreshUser } = useUser()

    const phone = useValidationInput('')
    const code = useValidationInput('', validators.code)

    const[token, setToken] = useState(null)

    const phoneHandler = () => {
        changePhone(phone.value).then((res) => {
            if(!res) { return }

            setToken(res.token)
        })
    }

    const confirmHandler = () => {
        confirmPhone(token, code.value).then((res) => {
            if(!res) { return }

            pushMess('Телефон успешно подтвержден')
            refreshUser()
        }) 
    }

    const backHandler = () => {
        if(token) { setToken(null) }
        else { logout() }
    }

    return (
        <div className='container'>
            <BackSection className='mb-auto' handler={backHandler} />

            {(!token && <ConfirmPhoneSection phone={phone} callback={phoneHandler} />)}

            {(token && <ConfirmCodeSection phone={phone.value} code={code} callback={confirmHandler} />)}
        </div>
    );
}

export default ConfirmPage
