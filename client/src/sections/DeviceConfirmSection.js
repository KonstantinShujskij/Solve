import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UserPreview from '../components/UserPreview'
import useApi from '../hooks/api.hook'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'


function DeviceConfirmSection({id}) {
    const { infoUser } = useApi()

    const userType = useSelector(selectors.userType)
    const device = useSelector(selectors.device(id))

    const [master, setMaster] = useState({_id: '', name: '', avatar: ''})


    const load = () => { infoUser(device.master).then((master) => setMaster(master)) }
    
    useUnmount(load)
    

    return (
        <>
            {userType === "CLIENT" && <>
                <div className='card'>
                    <div className='text'>Поздравляем, ваш заказ успешно выполнен!</div>
                </div>
                <div className='separator'>
                    <div className='separator__hr'></div>
                    <span className='separator__text text'>Исполнитель</span>
                    <div className='separator__hr'></div>
                </div>

                <div className='card'>
                    <UserPreview id={master._id} name={master.name} avatar={master.avatar} />
                </div>      
            </>}  

            {userType === "MASTER" && <>
                <div className='card'>
                    <div className='text'>Поздравляем, вы успешно выполнели заказ!</div>
                </div>
            </>}  
        </>
    )
}

export default DeviceConfirmSection
