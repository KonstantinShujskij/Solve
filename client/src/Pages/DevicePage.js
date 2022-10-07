import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FRONT_URL, ICONS } from '../const'
import useApi from '../hooks/api.hook'
import '../styles/device.css'
import Bet from '../components/Bet'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'
import { useSelector } from 'react-redux'
import Input from '../components/base/Input'
import useValidationInput from '../hooks/input.hook'
import BackSection from "../sections/BackSection"
import MenuSection from "../sections/MenuSections"
import useAlert from '../hooks/alert.hook'
import * as initial from '../initial'

function timeToDate(time) {
    const date = new Date(parseInt(time))
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 5)
}

function DevicePage() {
    const { loadBet, loadBets, loadDevice, placeBet } = useApi()   
    const { pushMess } = useAlert()
    const params = useParams()
    
    const userType = useSelector(selectors.userType)
    const userId = useSelector(selectors.userId)

    const [device, setDevice] = useState(initial.device)
    const [bet, setBet] = useState(null)
    const [bets, setBets] = useState([])

    const [isBeting, setIsBeting] = useState(false) 
    const [isBet, setIsBet] = useState(false) 

    const betPrice = useValidationInput('')
    const betDescription = useValidationInput('')

    const load = () => { loadDevice(params.id).then((device) => {
        setDevice(device)

        if(device.bet) { loadBet(device.bet).then((bet) => setBet(bet)) }
        else { loadBets(device.bets).then((bets) => { 
            setBets(bets) 
            if(bets.filter((bet) => bet.owner === userId).length) { setIsBet(true) }
        })}
    })}

    const setBetHandler = () => {
        placeBet(params.id, betPrice.value, betDescription.value).then((res) => {
            if(res) {
                setIsBeting(false) 
                pushMess('Ставка сделана')
                setIsBet(true)
                load()
            }
        })  
    }

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

            {(device.status === 'RESERVE' && bet && <Bet bet={bet} refresh={load} />)}
           
            {(device.status === 'SEARCH' && <>
                <div className='separator'>
                    <div className='separator__hr'></div>
                    <span className='separator__text text'>Ставки</span>
                    <div className='separator__hr'></div>
                </div>

                {(userType === "MASTER" && !isBet && <>
                    {(!isBeting && <>
                        <button className='button w-100' onClick={() => setIsBeting(true)}>Взяти Участь</button> 
                        <div className='card__space'></div>
                    </>)}

                    {(isBeting && <>
                        <div className='card'>
                            <Input input={betPrice.bind} label="Ваша ставка" />
                            <div className='card__space'></div>
                            <textarea className='input textarea' {...betDescription.bind} placeholder='Коментар'></textarea>
                            <button className='w-100 button card__button' onClick={setBetHandler}>Зробити Ставку</button>
                        </div>
                        <div className='card__space'></div>
                    </>)}
                </>)} 

                {(!!bets.length && 
                    <div className='bets-list'>
                        {bets.map((bet) => <Bet bet={bet} refresh={load} key={bet._id} />)}
                    </div>   
                )}

                {(!bets.length && <div className='text text-center'>Ставок нет</div>)}
            </>)}

            {(device.status === 'CHECK' && userType === "MASTER" && <>
                <div className='check__buttons'>
                    <button className='w-100 button card__button red'>Відхилити</button>
                    <button className='w-100 button card__button'>Прийняти</button>
                </div>
            </>)}


        </div>

        <MenuSection className="mt-auto" />

        </div>
    )
}

export default DevicePage
