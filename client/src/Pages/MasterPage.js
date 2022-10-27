import React from 'react'
import { Outlet } from "react-router-dom";
import MenuSection from '../sections/MenuSections'


function MasterPage() {
    return (
        <div className='container master'>
            <Outlet />

            <MenuSection className='mt-auto' />
        </div>
    )
}

export default MasterPage
