import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Device from '../components/Device'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'


function AuctionListSection() {
    const { getAuctions } = useApi()
    const { refreshDevices } = useDevice()

    const devices = useSelector(selectors.devices)

    const [list, setList] = useState([])

    useUnmount(() => { getAuctions().then((list) => { 
        refreshDevices(list)
        setList(list) 
    })})
    
    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Мої аукціони</h2>
                {!list.length && <p className='text'>Наразі у вас не розміщено аукціонів. Натисніть “Створити”, щоб додати новий аукціон</p>}
            </div>

            <div className='devices'>
                { list.map((item) => devices[item.id]? <Device device={devices[item.id]} key={item.id} /> : '') }  
            </div> 
        </>
    )
}

export default AuctionListSection
