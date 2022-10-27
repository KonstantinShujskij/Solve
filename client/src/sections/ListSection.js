import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { AVATAR, FRONT_URL, ICONS } from '../const'
import * as selectors from '../selectors'

function ListSection() {
    const user = useSelector(selectors.user)

    return (
        <>
            <div className='top-back'>
                <div className='avatar small-avatar'>
                    <img className='avatar__image' src={`${FRONT_URL}/store/images/${user.avatar? user.avatar : AVATAR}`} alt="avatar" />
                </div>

                <Link className='filter-button ml-auto' to="filter">
                    <div className="icon">{ICONS.filter}</div>
                </Link>
            </div>

            <Outlet />           
        </>
    )
}

export default ListSection
