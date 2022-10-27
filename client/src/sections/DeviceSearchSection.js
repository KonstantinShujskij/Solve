import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useApi from '../hooks/api.hook'
import useAlert from '../hooks/alert.hook'
import useDevice from '../hooks/devices.hook'
import useBet from '../hooks/bet.hook'
import useUnmount from '../hooks/unmount.hook'
import Bet from '../components/Bet'
import BetForm from '../components/BetForm'
import * as selectors from '../selectors'



function DeviceSearchSection({id}) {
    const { loadBets, placeBet } = useApi()
    const { pushMess } = useAlert()
    const { refreshDevice } = useDevice()

    const userType = useSelector(selectors.userType)
    const userId = useSelector(selectors.userId)
    const device = useSelector(selectors.device(id))

    const bet = useBet()

    const [bets, setBets] = useState(false)
    const [isBet, setIsBet] = useState(false)

    const load = (ids) => {
        loadBets(ids).then((bets) => {
            setBets(bets)
            setIsBet(!!bets.filter((bet) => bet.owner === userId).length)
        })
    }

    const setBetHandler = () => {
        placeBet(id, bet.price, bet.description).then((res) => {
            if(!res) { return }

            pushMess('Ставка успешно сделана')
            setBets(true)            

            refreshDevice(id).then((device) => load(device.bets))
        })
    }

    const refresh = () => { refreshDevice(id).then((device) => load(device.bets)) }

    useUnmount(() => load(device.bets))


    return (
        <>
            {(userType === "MASTER" && !isBet && <>
                <BetForm {...bet.bind} handler={setBetHandler} />
                <div className='card__space'></div>
            </>)} 

            <div className='separator'>
                <div className='separator__hr'></div>
                <span className='separator__text text'>Ставки</span>
                <div className='separator__hr'></div>
            </div>

            {(!!bets.length && 
                <div className='bets-list'>
                    {bets.map((bet) => <Bet bet={bet} refresh={refresh} key={bet._id} />)}
                </div>   
            )}

            {(!bets.length && <div className='text text-center'>Ставок нет</div>)}
        </>
    )
}

export default DeviceSearchSection
