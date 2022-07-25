import React, { useEffect } from 'react'
import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"
import * as selectors from '../selectors'
import useDevice from '../hooks/devices.hook'
import Device from '../components/Device'


function ClientPage() {
    const navigate = useNavigate();
    const list = useSelector(selectors.devices)

    const user = useSelector(selectors.user)
    const { refreshDevices } = useDevice()

    return (
        <div className="auth">
            <div className='top'>
                <div className='top__logo' onClick={() => navigate('/settings')}></div>
                <div className='top__name'>{ user.name }</div>
            </div>
            <div className='client-main'>
                { list.map((device) => <Device device={device} key={device._id}></Device>) }
                {!list.length && <div>Наразі жоден ваш пристрій не ремонтується </div>}
            </div>
            <button className='btn btn-lg mt-auto' onClick={() => refreshDevices()}>Обновить</button>
            <button className='btn btn-lg mt-auto' onClick={() => navigate('/create')}>Создать</button>
        </div>
    )
}

export default ClientPage;
