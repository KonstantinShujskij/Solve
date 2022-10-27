import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ICONS } from "../const"
import useApi from "../hooks/api.hook"
import useUnmount from "../hooks/unmount.hook"
import Input from "./base/Input"


export default function Contract({contract, price=null, terms=null}) {
    const { infoUser, loadDevice } = useApi()

    const [device, setDevice] = useState(null)
    const [client, setClient] = useState({_id: '', name: ''})
    const [master, setMaster] = useState({_id: '', name: ''})
    
    const load = () => {
        if(price) { price.changeValue(contract.price) }
        if(terms) { terms.changeValue(contract.data) }

        infoUser(contract.client).then((user) => setClient(user))
        infoUser(contract.master).then((user) => setMaster(user))
        loadDevice(contract.device).then((device) => setDevice(device))
    }

    useUnmount(load)
   
    return (
        <div className='card'>
            <div className="device__row device__label">
                <div className="device__icon icon">{ICONS.model}</div>
                {device && <Link className="device__title" to={`/device/${device._id}`}>{device.model}</Link>}
            </div>
            <div className='card__hr'></div>
            <div className="device__row device__label">
                <div className="device__icon icon">{ICONS.bet}</div>
                {(contract.clientAccept && contract.masterAccept && 
                    <p className='text'>{contract.price}</p>
                )}
                {(price && (!contract.clientAccept || !contract.masterAccept) && 
                    <Input input={price.bind} label="Цена" />
                )}                    
            </div>
            <div className='card__hr'></div>
            <div className="device__row">
                <div className="device__icon icon">{ICONS.coment}</div>
                {(contract.clientAccept && contract.masterAccept && 
                    <p className='text'>{contract.data}</p>
                )}
                {(terms && (!contract.clientAccept || !contract.masterAccept) && 
                    <textarea className='input textarea' {...terms.bind} placeholder='Условия контракта'></textarea>
                )}  
            </div>
            <div className='card__hr'></div>
            <div className="device__row device__label">
                <div className="device__icon icon">{ICONS.user}</div>
                <div className="device__title">{client.name}</div>
                {contract.clientAccept && <div className="device__icon icon ml-auto" style={{color: "#3DA9FC"}}>{ICONS.ok}</div>}
            </div>
            <div className='card__hr'></div>
            <div className="device__row device__label">
                <div className="device__icon icon">{ICONS.master}</div>
                <Link className="device__title" to={`/profile/${master._id}`}>{master.name}</Link>
                {contract.masterAccept && <div className="device__icon icon ml-auto" style={{color: "#3DA9FC"}}>{ICONS.ok}</div>}
            </div>
        </div>
    )
}
