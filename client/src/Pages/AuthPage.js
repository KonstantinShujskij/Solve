import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import BackSection from '../sections/BackSection'
import SocialSection from '../sections/SocialSection'

function AuthPage() {
    const navigate = useNavigate()

    return (
        <div className='container auth'>
            <BackSection className='mb-auto' handler={() => navigate(-1)} />
            <Outlet />
            <SocialSection className='mb-auto' />
        </div>
    );
}

export default AuthPage
