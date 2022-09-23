import React from 'react'
import { useSelector } from 'react-redux'
import Device from '../components/Device'
import useDevice from '../hooks/devices.hook'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'


function AuctionListSection() {
    const list = useSelector(selectors.devices)

    const { refreshDevices } = useDevice()

    useUnmount(() => { refreshDevices() })
    

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Мої аукціони</h2>
                {!list.length && <p className='text'>Наразі у вас не розміщено аукціонів. Натисніть “Створити”, щоб додати новий аукціон</p>}
            </div>

            <div className='devices'>
                { list.map((device) => <Device device={device} refreshHandler={() => refreshDevices()} key={device._id}></Device>) }  
            </div> 
        </>
    )
}

export default AuctionListSection
