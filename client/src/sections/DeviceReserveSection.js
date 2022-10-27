import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import useUnmount from '../hooks/unmount.hook'
import Bet from '../components/Bet'
import * as selectors from '../selectors'


function DeviceReserveSection({id}) {
    const { loadBet } = useApi()
    const { refreshDevice } = useDevice()

    const device = useSelector(selectors.device(id))

    const [bet, setBet] = useState(null)

    const load = () => { loadBet(device.bet).then((bet) => setBet(bet)) }

    useUnmount(load)

    return (
        <>
            <div className='separator'>
                <div className='separator__hr'></div>
                <span className='separator__text text'>Выбраная ставка</span>
                <div className='separator__hr'></div>
            </div>

            {(bet && <Bet bet={bet} refresh={() => refreshDevice(id)} />)}
        </>
    )
}

export default DeviceReserveSection
