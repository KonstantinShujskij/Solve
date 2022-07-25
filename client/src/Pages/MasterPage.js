import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"

import useAuth from '../hooks/auth.hook';
import { useNavigate } from "react-router-dom";
import useApi from '../hooks/api.hook';
import * as selectors from '../selectors'
import Lot from '../components/Lot'
import useValidationInput from '../hooks/input.hook'


function MasterPage() {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const { loadLots, loadOrders, acceptContract, getContract } = useApi()

    const user = useSelector(selectors.user)

    const [list, setList] = useState([])
    const [myDevice, setMyDevice] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [contract, setContract] = useState({})

    const contractData = useValidationInput('', () => true)


    useEffect(() => {
        loadLots().then((lots) => setList(lots))
        loadOrders().then((orders) => setMyDevice(orders))
    }, [])

    const acceptHandler = (id) => {
        acceptContract({ id, data: contractData.value }).then(() => {
            setIsOpen(false)
        })
    }

    const showContract = (id) => {
        getContract({id}).then((data) => { 
            setContract(data) 
        })
        
        setIsOpen(true)
    }

    return (
        <div className="token">
            <div className='top'>
                <div>MasterPage</div>
                <div className='top__name'>{(user? user.name : 'unknow')}</div>
            </div>
            
            <div className='client-main'>
                { list.map((device) => <Lot device={device} key={device._id}></Lot>) }
                {!list.length && <div> not have lots </div>}
            </div>

            <div className='client-main'>
                { myDevice.map((device) => <div key={device._id}>
                    <div>{device.model}</div>
                    <div>{device.category}</div>

                    {(device.status === 'RESERVE' && <>
                        <div>Ваша ставка была выбрана</div>
                        <button className="btn" onClick={() => showContract(device.contract)}>Подписать Контракт</button>
                    </>)}
                    
                    <div className={`device__popup ${isOpen?"device__popup_open":""}`}>
                        <div>{contract.data}</div>
                        <input {...contractData.bind} />
                        <button onClick={() => acceptHandler(device._id)}> accept </button>

                        <button onClick={() => { setIsOpen(false) }}>close</button>
                    </div>
                </div>) }
                {!myDevice.length && <div> not have lots </div>} 
            </div>

            <button onClick={() => { navigate('/'); logout() }}>Log Out</button>
        </div>
    );
}

export default MasterPage;
