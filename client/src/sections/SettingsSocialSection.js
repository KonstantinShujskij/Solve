import React from 'react'
import { useSelector } from 'react-redux'
import Contacts from '../components/Contacts'
import useApi from '../hooks/api.hook'

import useContacts from '../hooks/contacts.hook'
import useUser from '../hooks/user.hook'
import * as selectors from '../selectors'


function SettingsSocialSection() {
    const { refreshUser } = useUser()
    const { changeContact } = useApi()

    const user = useSelector(selectors.user)
    
    const contact = useContacts({
        telegram: user.telegram,
        instagram: user.instagram,
        whatsapp: user.whatsapp,
        facebook: user.facebook
    }) 

    const saveContactsHandler = () => { changeContact({...contact.values}).then((res) => { 
        console.log(res);
        refreshUser() 
    })}

    return (
        <div className='card'>
            <Contacts {...contact.bind} ></Contacts>
            <button className='button w-100 card__button' onClick={() => saveContactsHandler()}>Сохранить</button>
        </div>
    )
}

export default SettingsSocialSection
