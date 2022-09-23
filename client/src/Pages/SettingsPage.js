import React, { useState } from 'react'
import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"
import useAuth from '../hooks/auth.hook'
import * as selectors from '../selectors'
import { FRONT_URL, ICONS, SETTINGS_CONTACTS_SCREEN, SETTINGS_MENU_SCREEN, SETTINGS_PHONE_SCREEN } from '../const'
import Contacts from '../components/Contacts'
import useContacts from '../hooks/contacts.hook'
import useApi from '../hooks/api.hook'
import useUser from '../hooks/user.hook'
import BackSection from '../sections/BackSection'
import Avatar from '../components/Avatar'

import "../styles/settings.css"
import MenuSection from '../sections/MenuSections'


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

        if(!page) return navigate(-1)

        setStack(temp)
        setCurrentScreen(page)
    }

    const saveContactsHandler = async () => {
        await changeContactUser({...contact.values})
        refreshUser()
        backHandler()
    }

    return (
       <div className='container settings'>
            <BackSection handler={() => backHandler()} />

            <div className='list'>
                <div className='content'>
                    <h2 className='title content__title'>Налаштування профілю</h2>
                </div>

                <Avatar path={`${FRONT_URL}/images/avatar.png`} onEdit={(files) => console.log(files)} />

                <h2 className='title content__title settings__welcome'>Вітаємо, {user.name}!</h2>
            
                <div className='card'>
                    {(currentScreen === SETTINGS_MENU_SCREEN && <>
                        <button className='button w-100 card__button' onClick={() => nextHandler(SETTINGS_PHONE_SCREEN)}>Змінити контактний номер</button>
                        <button className='button w-100 card__button' onClick={() => nextHandler(SETTINGS_CONTACTS_SCREEN)}>Налаштувати соціальні мережі</button>
                        <button className='button w-100 card__button button-grey' >Повідомити про помилку</button>
                        <button className='button w-100 card__button red' onClick={() => logout()}>Вийти з облікового запису</button>
                    </>)}

                    {(currentScreen === SETTINGS_PHONE_SCREEN && <>
                        <div>Phone</div>
                    </>)}

                    {(currentScreen === SETTINGS_CONTACTS_SCREEN && <>
                        <Contacts {...contact.bind} ></Contacts>
                        <button className='button w-100 card__button' onClick={() => saveContactsHandler()}>Save</button>
                    </>)}            
                </div>
            </div>

            <MenuSection />
       </div>
    )
}

export default SettingsPage;
