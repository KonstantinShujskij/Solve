import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { AVATAR, FRONT_URL } from '../const'
import MenuSection from '../sections/MenuSections'
import useUnmount from '../hooks/unmount.hook'

import * as selectors from '../selectors'
import { removeCurrentDevice } from '../redux/actions'


function ClientPage() {
    const user = useSelector(selectors.user)

    const dispatch = useDispatch()

    useUnmount(() => {
        dispatch(removeCurrentDevice())
    })

    return (
        <div className='container client'>
            <div className='content'>
                <div className='avatar small-avatar'>
                    <img className='avatar__image' 
                         src={`${FRONT_URL}/store/images/${user.avatar? user.avatar : AVATAR}`} 
                         alt="avatar" />
                </div>
            </div>

            <Outlet />

            <div className='button-wrap mt-auto'>
                <Link className='button w-100 card__button' to="/create">Создать</Link>
            </div>
            
            <MenuSection />
        </div>
    )
}

export default ClientPage
