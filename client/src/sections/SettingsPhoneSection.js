import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useApi from '../hooks/api.hook'
import useUser from '../hooks/user.hook'
import useAlert from '../hooks/alert.hook'
import useValidationInput from '../hooks/input.hook'
import * as selectors from '../selectors'
import Input from '../components/base/Input'

import { ICONS } from '../const'
import Code from '../components/Code'
import * as validators from '../validators'


function SettingsPhoneSection() {
    const { changePhone, confirmPhone } = useApi()
    const { refreshUser } = useUser()
    const { pushMess } = useAlert()

    const user = useSelector(selectors.user)
    const phone = useValidationInput(user.phone) 
    const code = useValidationInput('', validators.code)

    const [token, setToken] = useState(null)

    const saveHandler = () => {
        changePhone(phone.value).then((res) => { 
            if(!res) { return }
            if(res.exist) { pushMess('Телефон сохранен') }

            setToken(res.token)      
        })
    }

    const confirmHandler = () => {
        confirmPhone(token, code.value).then((res) => {
            if(!res) { return }

            setToken(null)
            pushMess('Телефон сохранен')
            refreshUser()    
        })
    }

    return (
        <div className='card'>
            <h2 className='title content__title'>Телефон</h2>
            <div className='card__space'></div>    
            {(!token && <>
                <Input input={phone.bind} icon={ICONS.mobile} label='Телефон' />
                <button className='button w-100 card__button' onClick={saveHandler}>Сохранить</button>
            </>)} 
            {(!!token && <>
                <Code code={code} />
                <button className='button w-100 card__button' onClick={confirmHandler}>Подтвердить</button>
            </>)}       
        </div>
    )
}

export default SettingsPhoneSection
