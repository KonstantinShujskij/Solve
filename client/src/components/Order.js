import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ICONS } from "../const"
import Input from "../components/base/Input"
import useValidationInput from "../hooks/input.hook"
import useApi from "../hooks/api.hook"
import useDebounce from "../hooks/debounce.hook."
import useAlert from "../hooks/alert.hook"
import useDevice from '../hooks/devices.hook'



export default function Order({device, refresh}) {
    const { cancelBet, changeDeviceNotes, changeDeviceStatus } = useApi()
    const { pushMess } = useAlert()
    const { refreshDevice } = useDevice()

    const [edit, setEdit] = useState(false)

    const debounce = useDebounce((callback) => callback(), 700)
    
    const workStatus = useValidationInput(device.workStatus, undefined, () => debounce(saveStatus))
    const notes = useValidationInput(device.notes, undefined, () => debounce(saveNotes))

    const saveNotes = () => {
        changeDeviceNotes(device._id, notes.value).then((res) => {
            if(!res) { return }

            pushMess("Изменения сохранены")
            refreshDevice(device._id)
        })
    }

    const saveStatus = () => {
        changeDeviceStatus(device._id, workStatus.value).then((res) => {
            if(!res) { return }

            pushMess("Изменения сохранены")
            refreshDevice(device._id)
        })
    }

    const cancelHandler = () => { cancelBet(device.bet).then(refresh) }

    
    return (
        <div className="card device">
            <div className="device__row">
                <div className="device__icon icon">{ICONS.model}</div>
                <Link className="device__title" to={`/device/${device._id}`}>{device.model}</Link>
                {device.status === 'PACT' && <>
                    <div className={`device__edit ${edit? 'device__edit_active' : ''} icon ml-auto`}
                         onClick={() => setEdit(!edit)}>{ICONS.edit}</div>
                </>}

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
                    {(edit && <Input input={workStatus.bind} label="Текущий статус" />)}
                    {(!edit && <>
                        <div className="device__text">
                            <p>Статус:</p>
                            <p>{device.workStatus}</p>
                        </div>
                    </>)}
                </div>
                <div className="card__hr"></div>
                <div className="device__row">
                    <div className="device__icon icon">{ICONS.coment}</div>
                    {(edit && <textarea className="input textarea" {...notes.bind} placeholder='Заметка'></textarea>)}
                    {(!edit && <>
                        <div className="device__text">
                            <p>{device.notes}</p>
                        </div>
                    </>)}                    
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
