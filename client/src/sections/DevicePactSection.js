import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useApi from '../hooks/api.hook'
import useUnmount from '../hooks/unmount.hook'
import Contract from '../components/Contract'
import * as selectors from '../selectors'
import ContactPreview from '../components/ContactPreview'
import UserPreview from '../components/UserPreview'


function timeToDate(time) {
    const date = new Date(parseInt(time))
    return date.toLocaleDateString()
}

function DevicePactSection({id}) {
    const { loadContract, infoUser } = useApi()

    const userType = useSelector(selectors.userType)
    const device = useSelector(selectors.device(id))

    const [contract, setContract] = useState(null)
    const [master, setMaster] = useState(null)
    const [client, setClient] = useState(null)



    const load = () => { 
        loadContract(device.contract).then((contract) => {
            setContract(contract)
            return contract
        }).then((contract) => {
            if(!contract) { return }

            if(userType === "CLIENT") { infoUser(contract.master).then((master) => setMaster(master)) }
            if(userType === "MASTER") { infoUser(contract.client).then((client) => setClient(client)) }
        })

    }

    useUnmount(load)

    return (
        <>
            <div className='separator'>
                <div className='separator__hr'></div>
                <span className='separator__text text'>Контракт</span>
                <div className='separator__hr'></div>
            </div>

            {(contract && <Contract contract={contract} />)}
            <div className='card__space'></div>

            <div className='separator'>
                <div className='separator__hr'></div>
                <span className='separator__text text'>Контакты</span>
                <div className='separator__hr'></div>
            </div>

            {userType === "CLIENT" && master && <>
                <div className='card'>
                    <UserPreview id={master._id} name={master.name} avatar={master.avatar} />
                    <div className='card__space'></div>
                    <ContactPreview user={master} />
                </div>
            </>}  

            {userType === "MASTER" && client && <>
                <div className='card'>
                    <UserPreview id={client._id} name={client.name} avatar={client.avatar} />
                    <div className='card__space'></div>
                    <ContactPreview user={client} />
                    <div className='card__space'></div>
                    <div className='text'>Замовлення поступило {timeToDate(device.createdAt)}</div>
                </div>
            </>}  
        </>
    )
}

export default DevicePactSection
