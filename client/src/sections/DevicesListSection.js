import React from 'react'
import { useSelector } from 'react-redux'
import Device from '../components/Device'
import useDevice from '../hooks/devices.hook'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'


function DevicesListSection() {
    const list = useSelector(selectors.devices)

    const { refreshDevices } = useDevice()

    useUnmount(() => { refreshDevices() })
    

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Мої пристрої</h2>
                {!list.length && <p className='text'>Наразі жоден ваш пристрій не ремонтується. Натисніть “Створити”, щоб додати пристрій</p>}
            </div>

            <div className='devices'>
                { list.map((device) => <Device device={device} refreshHandler={() => refreshDevices()} key={device._id}></Device>) }  
            </div> 
        </>
    )
}

export default DevicesListSection
