import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAlert from '../hooks/alert.hook'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import { setCurrentDevice } from '../redux/actions'
import * as selectors from '../selectors'


function DeviceCancelSection({id}) {
    const { pushAuction } = useApi()
    const { refreshDevice } = useDevice()
    const { pushMess } = useAlert()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userType = useSelector(selectors.userType)
    const device = useSelector(selectors.device(id))


    const placeAuctionHandler = () => {
        pushAuction(id).then((res) => { 
            if(!res) { return }

            pushMess('Устройство выставленно на аукцион')
            refreshDevice(id)
        })
    }

    const selectMasterHandler = () => {
        dispatch(setCurrentDevice(device._id))
        navigate('/search') 
    }


    return (
        <>
            {userType === "CLIENT" && <>
                <div className='card'>
                    <div className='text'>Сожалеем выбранный вами заказчик отказался от выполнения</div>
                    <button className="button w-100 card__button" onClick={placeAuctionHandler}>Выставить заказ на аукцион</button>
                    <button className="button w-100 card__button red" onClick={selectMasterHandler}>Выбрать исполнителя</button>
                </div> 
            </>}  
        </>
    )
}

export default DeviceCancelSection
