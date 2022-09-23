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
import { useNavigate } from "react-router-dom"


function timeToDate(time) {
    const date = new Date(time)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 5)
}

function DevicePage() {
    const navigate = useNavigate()
    const params = useParams()
    const userType = useSelector(selectors.userType)
    const userId = useSelector(selectors.userId)
    
    const { loadDevice, getBets, getBet, placeBet } = useApi()    

    const [device, setDevice] = useState({status: '', images: []})
    const [bets, setBets] = useState([])
    const [bet, setBet] = useState(null)


    const [isBeting, setIsBeting] = useState(false) 
    const [isBet, setIsBet] = useState(false) 

    const betPrice = useValidationInput('')
    const betDescription = useValidationInput('')

    useUnmount(() => { 
        loadDevice({ id: params.id}).then((data) => {
            setDevice(data)

            if(data.status === 'SEARCH') {
                getBets({ids: data.bets}).then((data) => {
                    setBets(data)
                    if(data.filter(bet => bet.owner === userId).length) { setIsBet(true) }
                })    
            }
            else if(data.status === 'RESERVE') {
                getBet({id: data.bet}).then((data) => {
                    setBet(data)
                })
            }
        })
    })

    const setBetHandler = () => {
        placeBet({id: params.id, price: betPrice.value, description: betDescription.value}).then((res) => {
            console.log(res);
            setIsBeting(false) 
            setIsBet(true)
            return getBets({ids: device.bets})
        }).then((data) => {
            setBets(data)
            console.log('ry', data); 
        })    
    }

    return (
        <div className='container device-page'>
        <div className='header'>
            <button className='back-btn' onClick={() => navigate(-1)}>
                <span className='icon'>{ICONS.back}</span>
            </button>
        </div>

        <div className='list'>
            <div className='card device'>
                {(userType === "MASTER" && <>
                    <div className="device__row device__label">
                        <div className="device__icon icon" style={{color: "#5F6C7B"}}>{ICONS.circle}</div>
                        <div className="device__text">
                            <p>Категорія: {device? device.category : ''}</p>
                        </div>
                    </div>
                    <div className="w-100 text lot__time">{device? timeToDate(device.time) : ''}</div>
                </>)}

                <div className="device__row">
                    <div className="device__icon icon">{ICONS.model}</div>
                    <div className="device__title">{device? device.model: ''}</div>
                </div>
                <div className="card__hr"></div>
                <div className='card__space'></div>
                <div className='device__image'>
                    {device && <img src={`${FRONT_URL}/store/images/${device.images[0]}`} alt='device' />}
                </div>
                <div className='card__space'></div>
                <div className='device__text'>
                    Опис проблеми: Lorem ipsum dolor sit amet, populo ornatus nam eu.
                </div>
            </div>

            {(userType === "MASTER" && !isBet && <>
                {(!isBeting && <button className='button w-100' onClick={() => setIsBeting(true)}>Взяти Участь</button> )}

                {(isBeting && 
                <div className='card'>
                    <Input input={betPrice.bind} label="Ваша ставка" />
                    <div className='card__space'></div>
                    <textarea className='input textarea' {...betDescription.bind} placeholder='Коментар'></textarea>
                    <button className='w-100 button card__button' onClick={setBetHandler}>Зробити Ставку</button>
                </div>
                )}
            </>)}

            {(device.status === 'SEARCH' && bets.length > 0 && <>
                <div className='separator'>
                    <div className='separator__hr'></div>
                    <span className='separator__text text'>Ставки</span>
                    <div className='separator__hr'></div>
                </div>
                
                <div className='bets-list'>
                    {bets.map((bet) => <Bet bet={bet} key={bet._id} />)}
                </div>            
            </>)}

            {(device.status === 'RESERVE' && bet && <Bet bet={bet} status='pact' />)}
        </div>

        </div>
    )
}

export default DevicePage
