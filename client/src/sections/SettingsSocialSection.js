import React from 'react'
import { useSelector } from 'react-redux'
import useApi from '../hooks/api.hook'
import useUser from '../hooks/user.hook'
import useAlert from '../hooks/alert.hook'
import useContacts from '../hooks/contacts.hook'
import * as selectors from '../selectors'
import Contacts from '../components/Contacts'


function SettingsSocialSection() {
    const { changeContact } = useApi()
    const { refreshUser } = useUser()
    const { pushMess } = useAlert()

    const user = useSelector(selectors.user)
    
    const contact = useContacts({
        telegram: user.telegram,
        instagram: user.instagram,
        whatsapp: user.whatsapp,
        facebook: user.facebook
    }) 

    const saveContactsHandler = () => { 
        changeContact({...contact.values}).then((res) => { 
            if(!res) { return }

            pushMess('Ваши контактные данные изменены')
            refreshUser() 
        })
    }

    return (
        <div className='card'>
            <Contacts {...contact.bind} />
            <button className='button w-100 card__button' onClick={saveContactsHandler}>Сохранить</button>
        </div>
    )
}

export default SettingsSocialSection
