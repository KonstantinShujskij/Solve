import React from "react"
import { Link } from "react-router-dom"
import { ICONS } from "../const"
import Input from "../components/base/Input"
import useValidationInput from "../hooks/input.hook"
import useApi from "../hooks/api.hook"


export default function Order({device, refresh}) {
    const { cancelBet } = useApi()
    
    const workStatus = useValidationInput(device.workStatus)
    const notes = useValidationInput(device.notes)

    const cancelHandler = () => { cancelBet(device.bet).then(refresh) }

    
    return (
        <div className="card device">
            <div className="device__row">
                <div className="device__icon icon">{ICONS.model}</div>
                <Link className="device__title" to={`/device/${device._id}`}>{device.model}</Link>
            </div>
            <div className="card__hr"></div>

            {device.status === 'RESERVE' && <>
                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.info}</div>
                    <div className="device__text"><p>Вы выбраны исполнителем</p></div>
                </div>
                <div className="card__hr"></div>

                <Link className="button w-100 card__button" to={`/contract/${device.contract}`}>Подписать Контракт</Link>
                <button className="button w-100 card__button red" onClick={cancelHandler}>Отказаться</button>
            </>}

            {device.status === 'PACT' && <>
                <div className="device__row device__label">
                    <div className="device__icon icon" style={{color: "#FCC73D"}}>{ICONS.circle}</div>
                    <Input input={workStatus.bind} label="Текущий статус" />
                </div>
                <div className="card__hr"></div>
                <div className="device__row">
                    <div className="device__icon icon">{ICONS.coment}</div>
                    <textarea className="input textarea" {...notes.bind} placeholder='Заметка'></textarea>
                </div>
            </>}

            {device.status === 'CONFIRM' && <>
                <div className="device__row device__label">
                    <div className="device__icon icon" style={{color: "#3DFC72"}}>{ICONS.circle}</div>
                    <div className="device__text"><p>Выполнен</p></div>
                </div>
            </>}

        </div>
    )
}
