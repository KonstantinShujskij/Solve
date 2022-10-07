import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useApi from '../hooks/api.hook'
import '../styles/device.css'
import useUnmount from '../hooks/unmount.hook'
import { ICONS } from '../const'
import Input from '../components/base/Input'
import useValidationInput from '../hooks/input.hook'
import BackSection from '../sections/BackSection'
import Logo from '../components/Logo'

function ContractPage() {
    const params = useParams()
    const navigate = useNavigate()
    const { getContract, infoUser, loadDevice, acceptContract } = useApi()

    const [contract, setContract] = useState()
    const [client, setClient] = useState()
    const [master, setMaster] = useState()
    const [device, setDevice] = useState()

    const price = useValidationInput('')
    const terms = useValidationInput('')

    const load = () => {
        getContract(params.id).then((data) => {
            setContract(data)
            terms.changeValue(data.data? data.data : '')
            price.changeValue(data.price? data.price : '')

            infoUser(data.client).then((res) => setClient(res))
            infoUser(data.master).then((res) => setMaster(res))
            loadDevice(data.device).then((res) => setDevice(res))
        })
    }

    useUnmount(load)

    const acceptHandler = () => {
        acceptContract({ id: device._id, data: terms.value, price: price.value }).then(load)
    }

    return (
        <div className='container'>
            <BackSection handler={() => navigate(-1)}>
                <Logo />
            </BackSection>
            <div className='title contract-title'>Контракт</div>
            <div className='card'>
                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.model}</div>
                    {device && <Link className="device__title" to={`/device/${device._id}`}>{device.model}</Link>}
                </div>
                <div className='card__hr'></div>
                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.bet}</div>
                    <Input input={price.bind} label="Цена" />
                </div>
                <div className='card__hr'></div>
                <div className="device__row">
                    <div className="device__icon icon">{ICONS.coment}</div>
                    <textarea className='input textarea' {...terms.bind} placeholder='Условия контракта'></textarea>
                </div>
                <div className='card__hr'></div>
                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.user}</div>
                    <div className="device__title">{client? client.name : ''}</div>
                    {contract && contract.clientAccept && <div className="device__icon icon ml-auto" style={{color: "#3DA9FC"}}>{ICONS.ok}</div>}
                </div>
                <div className='card__hr'></div>
                <div className="device__row device__label">
                    <div className="device__icon icon">{ICONS.master}</div>
                    <Link className="device__title" to={`/profile/${master? master._id : ''}`}>{master? master.name : ''}</Link>
                    {contract && contract.masterAccept && <div className="device__icon icon ml-auto" style={{color: "#3DA9FC"}}>{ICONS.ok}</div>}
                </div>
            </div>

            <div className='content mb-auto'>
                {(contract && (!contract.clientAccept || !contract.masterAccept) && 
                    <button className='w-100 button' onClick={acceptHandler}>Подписать</button>
                )}                
            </div>
        </div>
    )
}

export default ContractPage
