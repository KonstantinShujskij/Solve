import React from 'react'
import { useParams } from 'react-router-dom'
import { FRONT_URL, ICONS } from '../const'
import '../styles/device.css'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'
import { useSelector } from 'react-redux'
import BackSection from "../sections/BackSection"
import MenuSection from "../sections/MenuSections"
import useDevice from '../hooks/devices.hook'
import DeviceConfirmSection from '../sections/DeviceConfirmSection'
import DeviceCheckSection from '../sections/DeviceCheckSection'
import DevicePactSection from '../sections/DevicePactSection'
import DeviceReserveSection from '../sections/DeviceReserveSection'
import DeviceSearchSection from '../sections/DeviceSearchSection'
import DeviceCancelSection from '../sections/DeviceCancelSection'

function timeToDate(time) {
    const date = new Date(parseInt(time))
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 5)
}

function DevicePage() {
    const { refreshDevice } = useDevice()
    const params = useParams()
    
    const userType = useSelector(selectors.userType)
    const device = useSelector(selectors.device(params.id))

    const load = () => { refreshDevice(params.id) } 
    
    useUnmount(load)

    return (
        <div className='container device-page'>

        <BackSection />

        <div className='list device-page__list'>
            <div className='card device'>
                {(userType === "MASTER" && <>
                    <div className="device__row device__label">
                        <div className="device__icon icon" style={{color: "#5F6C7B"}}>{ICONS.label}</div>
                        <div className="device__text">
                            <p>Категорія: {device.category}</p>
                        </div>
                    </div>
                    <div className="w-100 text lot__time">{device? timeToDate(device.createdAt) : ''}</div>
                </>)}

                <div className="device__row">
                    <div className="device__icon icon">{ICONS.model}</div>
                    <div className="device__title">{device.model}</div>
                </div>
                <div className="card__hr"></div>
                <div className='card__space'></div>
                <div className='device__image'>
                    <img src={`${FRONT_URL}/store/images/${device.images[0]}`} alt='device' />
                </div>
                <div className='card__space'></div>
                <div className='device__text'>Опис проблеми: {device.description}</div> 
            </div>
           
            {(device.status === 'SEARCH' && <DeviceSearchSection id={params.id} /> )}

            {(device.status === 'RESERVE' && <DeviceReserveSection id={params.id} /> )}

            {(device.status === 'PACT' && <DevicePactSection id={params.id} /> )}

            {(device.status === 'CONFIRM' && <DeviceConfirmSection id={params.id} />)}

            {(device.status === 'CHECK' && <DeviceCheckSection id={params.id} />)}

            {(device.status === 'CANCEL' && <DeviceCancelSection id={params.id} />)}

        </div>

        <MenuSection className="mt-auto" />

        </div>
    )
}

export default DevicePage
