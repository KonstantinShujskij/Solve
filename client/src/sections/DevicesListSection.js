import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Device from '../components/Device'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'


function DevicesListSection() {
    const { getDevices } = useApi()
    const { refreshDevices } = useDevice()

    const devices = useSelector(selectors.devices)
    
    const [list, setList] = useState([])

    const load = () => {
        getDevices().then((list) => {
            refreshDevices(list)
            setList(list)
        })
    }

    useUnmount(load)
    

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Мої пристрої</h2>
                {!list.length && <p className='text'>Наразі жоден ваш пристрій не ремонтується. Натисніть “Створити”, щоб додати пристрій</p>}
            </div>

            <div className='devices'>
                { list.map((item) => devices[item.id]? <Device device={devices[item.id]} refresh={load} key={item.id} /> : '') }  
            </div>
        </>
    )
}

export default DevicesListSection
