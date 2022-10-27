import React, { useState } from "react"
import useApi from "../hooks/api.hook"
import '../styles/device.css'
import { ICONS } from "../const"
import { Link, useNavigate } from "react-router-dom"
import useUnmount from "../hooks/unmount.hook"
import { setCurrentDevice } from "../redux/actions"
import { useDispatch } from "react-redux"
import useAlert from "../hooks/alert.hook"

const nope = () => {}

export default function Device({device, refresh=nope}) {
    const { infoUser, cancelBet, pushAuction } = useApi()
    const { pushMess } = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [master, setMaster] = useState({})

    const load = () => { if(device.master) { infoUser(device.master).then((user) => setMaster(user)) } }

    const cancelHandler = () => { cancelBet(device.bet).then(refresh) }
 
    const placeAuctionHandler = () => {
        pushAuction(device._id).then((res) => { 
            if(!res) { return }

            pushMess('Устройство выставленно на аукцион')
            load()
        })
    }

    const selectMasterHandler = () => {
        dispatch(setCurrentDevice(device._id))
        navigate('/search') 
    }

    useUnmount(load)

    return (
        <div className="card device">
            <div className="device__row">
                <div className="device__icon icon">{ICONS.model}</div>
                <Link className="device__title" to={`/device/${device._id}`}>{device.model}</Link>
            </div>
            <div className="card__hr"></div>

           {(device.status === 'SEARCH' && <>
                <div className="device__row">
                    <div className="device__icon icon">{ICONS.bet}</div>
                    <div className="device__text">
                        <p>Ставок:</p>
                        <p>{device.bets.length}</p>
                    </div>
                </div>
            </>)}

            {(device.status === 'RESERVE' && <>
                <Link className="button w-100 card__button" to={`/contract/${device.contract}`}>Подписать Контракт</Link>
                {(device.bet && 
                    <button className="button w-100 card__button red" onClick={cancelHandler}>Отменить свой выбор</button>
                )}
            </>)}

            {(device.status === 'CHECK' && <>
                <div className="device__row">
                    <div className="device__icon icon" style={{color: "#FCC73D"}}>{ICONS.circle}</div>
                    <div className="device__text">
                        <p>Статус:</p>
                        <p>Находиться на рассмотрении</p>
                    </div>
                </div>
                <div className="card__hr"></div>
                <div className="device__row">
                    <div className="device__icon icon">{ICONS.place}</div>
                    <div className="device__text">
                        <p>Знаходиться у:</p>
                        <Link className="device__link" to={`/profile/${device.master}`}>{master.name}</Link>
                    </div>
                </div> 
            </>)}

            {(device.status === 'CANCEL' && <>
                <button className="button w-100 card__button" onClick={placeAuctionHandler}>Выставить заказ на аукцион</button>
                <button className="button w-100 card__button red" onClick={selectMasterHandler}>Выбрать исполнителя</button>
            </>)}

            {(device.status === 'PACT' && <>
                <div className="device__row">
                    <div className="device__icon icon" style={{color: "#FCC73D"}}>{ICONS.circle}</div>
                    <div className="device__text">
                        <p>Статус:</p>
                        <p>{device.workStatus}</p>
                    </div>
                </div>
                <div className="device__hr"></div>
                <div className="device__row">
                    <div className="device__icon icon">{ICONS.place}</div>
                    <div className="device__text">
                        <p>Знаходиться у:</p>
                        <Link className="device__link" to={`/profile/${device.master}`}>{master.name}</Link>
                    </div>
                </div> 
                <div className="device__hr"></div>
                <Link className="button w-100 card__button" to={`accept/${device._id}/${device.master}`}>Подтвердить выполнение</Link>
            </>)}
            
            {(device.status === 'CONFIRM' && <>
                <div className="device__row">
                    <div className="device__icon icon" style={{color: "#3DFC72"}}>{ICONS.circle}</div>
                    <div className="device__text">
                        <p>Статус:</p>
                        <p>Выполнен</p>
                    </div>
                </div>
                <div className="card__hr"></div>

                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.master}</div>
                    <Link className="subtitle" to={`profile/${device.master}`}>{master.name}</Link>
                </div>
            </>)}

        </div>
    )
}
