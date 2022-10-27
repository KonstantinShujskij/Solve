import React from 'react'
import { useSelector } from "react-redux"
import * as selectors from '../selectors'
import { NavLink } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { FRONT_URL } from '../const'


function MenuSection({className=''}) {
    const userType = useSelector(selectors.userType)

    return (
        <div className={`menu ${className}`}>
            {(userType === 'CLIENT') && <>
                <NavLink className='menu__item' to="/">
                    <ReactSVG className='menu__icon' src={`${FRONT_URL}/icons/Home.svg`}></ReactSVG>
                    <div className='menu__label'>Мої Пристрої</div>
                </NavLink>
                <NavLink className='menu__item' to="/auction-list">
                    <ReactSVG className='menu__icon' src={`${FRONT_URL}/icons/Auction.svg`}></ReactSVG>
                    <div className='menu__label'>Аукціон</div>
                </NavLink>
            </>}
            {(userType === 'MASTER') && <>
                <NavLink className='menu__item' to="/work-list">
                    <ReactSVG className='menu__icon' src={`${FRONT_URL}/icons/Home.svg`}></ReactSVG>
                    <div className='menu__label'>В роботі</div>
                </NavLink>
                <NavLink className='menu__item' to="/search-list">
                    <ReactSVG className='menu__icon' src={`${FRONT_URL}/icons/Auction.svg`}></ReactSVG>
                    <div className='menu__label'>Аукціон</div>
                </NavLink>
                <NavLink className='menu__item' to="/claim-list">
                    <ReactSVG className='menu__icon' src={`${FRONT_URL}/icons/Request.svg`}></ReactSVG>
                    <div className='menu__label'>Заявки</div>
                </NavLink>
            </>}
            
            <NavLink className='menu__item' to="/settings">
                <ReactSVG className='menu__icon' src={`${FRONT_URL}/icons/Profile.svg`}></ReactSVG>
                <div className='menu__label'>Профіль</div>
            </NavLink>
        </div>
    )
}

export default MenuSection
