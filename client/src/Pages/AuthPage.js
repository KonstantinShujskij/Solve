import React from 'react'
import { Outlet } from 'react-router-dom'

import BackSection from '../sections/BackSection'
import SocialSection from '../sections/SocialSection'

function AuthPage() {

    return (
        <div className='container auth'>
            <BackSection className='mb-auto' />
            <Outlet />
            <SocialSection className='mb-auto' />
        </div>
    );
}

export default AuthPage
