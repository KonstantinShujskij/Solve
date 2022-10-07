import React, { useState } from "react"
import useApi from "../hooks/api.hook"
import '../styles/device.css'
import { ICONS } from "../const"
import { Link } from "react-router-dom"
import useUnmount from "../hooks/unmount.hook"

const nope = () => {}

export default function Device({device, refresh=nope}) {
    const { infoUser, cancelBet } = useApi()

    const [master, setMaster] = useState({})

    const load = () => {
        if(device.master) { infoUser(device.master).then((user) => setMaster(user)) }
    }

    const cancelHandler = () => { cancelBet(device.bet).then(refresh) }
 
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
                <button className="button w-100 card__button red" onClick={cancelHandler}>Отменить свой выбор</button>
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
