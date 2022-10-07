import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Order from '../components/Order'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'


function WorkListSection() {
    const { getOrders } = useApi()
    const { refreshDevices } = useDevice()

    const devices = useSelector(selectors.devices)

    const [list, setList] = useState([])

    const load = () => {
        getOrders().then((list) => {
            refreshDevices(list)
            setList(list)
        })
    }

    useUnmount(load)

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>В роботі</h2>
                {!list.length && <p className='text'>Наразі у вас нет ни одного устройства в работе</p>}
            </div>

            <div className='list'>
                {list.map((item) =>  devices[item.id]? <Order device={devices[item.id]} refresh={load} key={item.id} /> : '') }
            </div>
        </>
    )
}

export default WorkListSection
