import React from 'react'
//import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { FRONT_URL } from '../const'
import MenuSection from '../sections/MenuSections'

//import * as selectors from '../selectors'


function ClientPage({active}) {
    const navigate = useNavigate()
    //const user = useSelector(selectors.user)

    return (
        <div className='container client'>
            <div className='content'>
                <div className='avatar small-avatar'>
                    <img className='avatar__image' src={`${FRONT_URL}/images/avatar.png`} alt="avatar" />
                </div>
            </div>

            <Outlet />

            <div className='button-wrap mt-auto'>
                <button className='button w-100 card__button' onClick={() => navigate('/create')}>Создать</button>
            </div>
            
            <MenuSection active={active}/>
        </div>
    )
}

export default ClientPage
