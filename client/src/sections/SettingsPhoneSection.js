import React from 'react'
import { useSelector } from 'react-redux'
import Input from '../components/base/Input'

import { ICONS } from '../const'
import useAlert from '../hooks/alert.hook'
import useApi from '../hooks/api.hook'
import useValidationInput from '../hooks/input.hook'
import useUser from '../hooks/user.hook'
import * as selectors from '../selectors'


function SettingsPhoneSection() {
    const { changePhone } = useApi()
    const { refreshUser } = useUser()
    const { pushMess } = useAlert()

    const user = useSelector(selectors.user)

    const phone = useValidationInput(user.phone) 

    const saveHandler = () => {
        changePhone(phone.value).then((result) => { 
            if(result) {
                pushMess('Телефон сохранен')
                refreshUser()
            }            
        })
    }

    return (
        <div className='card'>
            <h2 className='title content__title'>Телефон</h2>
            <div className='card__space'></div>            
            <Input input={phone.bind} icon={ICONS.mobile} label='Телефон' ></Input>
            <button className='button w-100 card__button' disabled={!phone.value} onClick={saveHandler}>Сохранить</button>
        </div>
    )
}

export default SettingsPhoneSection
