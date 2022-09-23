import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useApi from '../hooks/api.hook'
import '../styles/device.css'
import useUnmount from '../hooks/unmount.hook'
import { ICONS } from '../const'
import Input from '../components/base/Input'
import useValidationInput from '../hooks/input.hook'


function ContractPage() {
    const params = useParams()
    const { getContract, infoUser, loadDevice, acceptContract } = useApi()

    const [contract, setContract] = useState()
    const [client, setClient] = useState()
    const [master, setMaster] = useState()
    const [device, setDevice] = useState()

    const price = useValidationInput('')
    const terms = useValidationInput('')

    useUnmount(() => {
        getContract({id: params.id}).then((data) => {
            setContract(data)
            terms.changeValue(data.data)

            infoUser({id: data.client}).then((res) => setClient(res))
            infoUser({id: data.master}).then((res) => setMaster(res))
            loadDevice({id: data.device}).then((res) => setDevice(res))
        })
    })

    const acceptHandler = () => {
        acceptContract({ id: device._id, data: terms.value })
    }

    return (
        <div className='container'>
            <div className='title mb-auto'>Контракт</div>
            <div className='card'>
                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.model}</div>
                    {device && <Link className="device__title" to={`/device/${device._id}`}>{device.model}</Link>}
                </div>
                <div className='card__hr'></div>
                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.model}</div>
                    <Input input={price.bind} label="Цена" />
                </div>
                <div className='card__hr'></div>
                <div className="device__row">
                    <div className="device__icon icon">{ICONS.model}</div>
                    <textarea className='input textarea' {...terms.bind} placeholder='Условия контракта'></textarea>
                </div>
                <div className='card__hr'></div>
                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.model}</div>
                    <div className="device__title">{client? client.name : ''}</div>
                    <div className='ml-auto'></div>
                </div>
                <div className='card__hr'></div>
                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.model}</div>
                    <div className="device__title">{master? master.name : ''}</div>
                </div>
            </div>

            <div className='content mb-auto'>
                <button className='w-100 button' onClick={acceptHandler}>Подписать</button>
            </div>
        </div>
    )
}

export default ContractPage
