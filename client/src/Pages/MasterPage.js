import React from 'react'
import { useSelector } from "react-redux"

import { Outlet } from "react-router-dom";
import { AVATAR, FRONT_URL } from '../const';
import * as selectors from '../selectors'
import MenuSection from '../sections/MenuSections'


function MasterPage() {
    const user = useSelector(selectors.user)

    return (
        <div className='container master'>
            <div className='content'>
                <div className='avatar small-avatar'>
                    <img className='avatar__image' src={`${FRONT_URL}/store/images/${user.avatar? user.avatar : AVATAR}`} alt="avatar" />
                </div>
            </div>

            <Outlet />

            <MenuSection className='mt-auto' />
        </div>
    )
}

export default MasterPage
