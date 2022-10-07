import React from 'react'
import { useSelector } from "react-redux"

import { Outlet } from "react-router-dom"
import * as selectors from '../selectors'
import { AVATAR, FRONT_URL } from '../const'

import useApi from '../hooks/api.hook'
import useUser from '../hooks/user.hook'
import BackSection from '../sections/BackSection'
import Avatar from '../components/Avatar'

import "../styles/settings.css"
import MenuSection from '../sections/MenuSections'


function SettingsPage() {
    const { changeAvatar } = useApi()
    const { refreshUser } = useUser()

    const user = useSelector(selectors.user)

    const saveAvatar = async (file) => { changeAvatar(file).then(() => refreshUser()) }

    return (
       <div className='container settings'>
            <BackSection> 
                <div className='logo mr-auto'>
                    <img className='logo__image' src={`${FRONT_URL}/images/logo.svg`} alt='logo' />
                </div>
            </BackSection>

            <div className='list'>
                <div className='content'>
                    <h2 className='title content__title'>Налаштування профілю</h2>
                </div>

                <Avatar path={`${FRONT_URL}/store/images/${user.avatar? user.avatar : AVATAR}`} onEdit={saveAvatar} />

                <h2 className='title content__title settings__welcome'>Вітаємо, {user.name}!</h2>
            
                <Outlet />
            </div>

            <MenuSection className="mt-auto" />
       </div>
    )
}

export default SettingsPage;
