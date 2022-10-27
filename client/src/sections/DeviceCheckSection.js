import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ContactPreview from '../components/ContactPreview'
import UserPreview from '../components/UserPreview'
import useAlert from '../hooks/alert.hook'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'


function DeviceCheckSection({id}) {
    const { refreshDevice } = useDevice()
    const { infoUser, acceptClaim, cancelClaim } = useApi()
    const { pushMess } = useAlert()

    const userType = useSelector(selectors.userType)
    const device = useSelector(selectors.device(id))
    const [master, setMaster] = useState(null)

    const load = () => { infoUser(device.master).then((master) => setMaster(master)) }

    useUnmount(load)

    const acceptClaimHandler = () => {
        acceptClaim(id).then((res) => { 
            if(!res) { return }

            pushMess('Предложение принято')
            refreshDevice(id)
        })
    }

    const cancelClaimHandler = () => {
        cancelClaim(id).then((res) => { 
            if(!res) { return } 

            pushMess('Предложение отклонено')
            refreshDevice(id)
        })
    }


    return (
        <>
            {userType === "CLIENT" && <>
                <div className='card'> 
                    <div className='text text-center'>Ваш девайс находиться на рассмотрении</div>
                </div>
                {master && <>
                    <div className='separator'>
                        <div className='separator__hr'></div>
                        <span className='separator__text text'>Исполнитель</span>
                        <div className='separator__hr'></div>
                    </div>
                    <div className='card'>
                        <UserPreview id={master._id} name={master.name} avatar={master.avatar} />
                        <div className='card__space'></div>
                        <ContactPreview user={master} />
                    </div>                
                </>}
            </>}  

            {userType === "MASTER" && <>
                <div className='check__buttons'>
                    <button className='w-100 button card__button red' onClick={cancelClaimHandler}>Відхилити</button>
                    <button className='w-100 button card__button' onClick={acceptClaimHandler}>Прийняти</button>
                </div>
            </>}  
        </>
    )
}

export default DeviceCheckSection
