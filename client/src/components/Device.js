import React, { useState } from "react"
import useApi from "../hooks/api.hook"
import '../styles/device.css'
import { ICONS } from "../const"
import { Link } from "react-router-dom"
import useUnmount from "../hooks/unmount.hook"


export default function Device({device, refreshHandler}) {
    const { infoUser, cancelBet, acceptDevice } = useApi()

    const cancelHandler = (id) => {
        cancelBet({ id })
        refreshHandler()
    }

    const acceptHandler = () => {
        acceptDevice(device._id)
        refreshHandler()
    }

    const [master, setMaster] = useState(null)

    useUnmount(() => { 
        if(device && device.master) { 
            infoUser({id: device.master}).then((data) => {
                setMaster(data)
            }) 
        } 
    })

    return (
        <div className="card device">
            <div className="device__row">
                <div className="device__icon icon">{ICONS.model}</div>
                <Link className="device__title" to={`/device/${device._id}`}>{device.model}</Link>
            </div>
            <div className="card__hr"></div>

            {(device.status === 'SEARCH' && <>
                <div className="device__row">
                    <div className="device__icon icon" style={{color: "#FCC73D"}}>{ICONS.circle}</div>
                    <div className="device__text">
                        <p>Ставок:</p>
                        <p>{device.bets.length}</p>
                    </div>
                </div>
            </>)}

            {(device.status === 'RESERVE' && <>
                <Link className="button w-100 card__button" to={`/contract/${device.contract}`}>Подписать Контракт</Link>
                <button className="button w-100 card__button red" onClick={() => cancelHandler(device.bet)}>Отменить свой выбор</button>
            </>)}

            {(device.status === 'CHECK' && <>
                <div className="card__hr"></div>
                <button className="btn">Подписать Контракт</button>
            </>)}

            {(device.status === 'CANCEL' && <>
                <div className="device__hr"></div>
                <button className="btn">Выставить заказ на аукцион</button>
                <div className="device__hr"></div>
                <button className="btn">Отослать заказ конкретному исполнителю</button>
            </>)}

            {(device.status === 'PACT' && <>
                <div className="device__row">
                    <div className="device__icon icon" style={{color: "#FCC73D"}}>{ICONS.circle}</div>
                    <div className="device__text">
                        <p>Статус:</p>
                        <p>Очікує на комплектуючі</p>
                    </div>
                </div>
                <div className="device__hr"></div>
                <div className="device__row">
                    <div className="device__icon icon">{ICONS.place}</div>
                    <div className="device__text">
                        <p>Знаходиться у:</p>
                        <p className="device__link">Puremind</p>
                    </div>
                </div> 
                <div className="device__hr"></div>
                <button className="button w-100 card__button" onClick={acceptHandler}>Подтвердить выполнение</button>
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

                <div className="device__row">
                    <div className="device__icon icon" style={{color: "#fff"}}>{ICONS.circle}</div>
                    <Link className="subtitle" to={`profile/${device.master}`}>{master? master.name : ''}</Link>
                </div>
            </>)}

        </div>
    )
}
