import React, { useState } from 'react'
import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../hooks/auth.hook'
import * as selectors from '../selectors'
import { SETTINGS_CONTACTS_SCREEN, SETTINGS_MENU_SCREEN, SETTINGS_PHONE_SCREEN } from '../const'
import Contacts from '../components/Contacts'
import useContacts from '../hooks/contacts.hook'
import useApi from '../hooks/api.hook'
import useUser from '../hooks/user.hook'



function SettingsPage() {
    const navigate = useNavigate();
    const { logout } = useAuth()
    const { changeContactUser } = useApi()
    const { refreshUser } = useUser()

    const user = useSelector(selectors.user)

    const contact = useContacts({
        telegram: user.telegram,
        instagram: user.instagram,
        whatsapp: user.whatsapp,
        facebook: user.facebook
    }) 

    const [currentScreen, setCurrentScreen] = useState(SETTINGS_MENU_SCREEN)
    const [stack, setStack] = useState([])

    const nextHandler = (page) => { 
        setCurrentScreen((prvPage) => {
            setStack((prvStack) => [...prvStack, prvPage])
            return page
        })
    }

    const backHandler = () => {
        const temp = [...stack]
        const page = temp.pop()

        if(!page) return navigate('/')

        setStack(temp)
        setCurrentScreen(page)
    }

    const saveContactsHandler = async () => {
        await changeContactUser({...contact.values})
        refreshUser()
        backHandler()
    }

    return (
       <div className='settings'>
            <button className='back-btn' onClick={backHandler}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
            
            {(currentScreen === SETTINGS_MENU_SCREEN && <>
                <div className='mt-auto'>
                    <span onClick={() => nextHandler(SETTINGS_PHONE_SCREEN)}>Змінити контактний номер</span>
                </div>            
                <div className=''>
                    <span onClick={() => nextHandler(SETTINGS_CONTACTS_SCREEN)}>Налаштувати соціальні мережі</span>
                </div>
                <div className='featback mt-auto'>
                    <span>Повідомити про помилку</span>
                </div>
                <div className='logut'>
                    <span onClick={() => logout()}>Вийти з облікового запису</span>
                </div>
            </>)}

            {(currentScreen === SETTINGS_PHONE_SCREEN && <>
                <div>Phone</div>
            </>)}

            {(currentScreen === SETTINGS_CONTACTS_SCREEN && <>
                <Contacts {...contact.bind} ></Contacts>
                <button className='btn' onClick={() => saveContactsHandler()}>Save</button>
            </>)}

       </div>
    );
}

export default SettingsPage;
