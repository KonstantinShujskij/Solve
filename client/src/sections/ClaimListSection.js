import React, { useState } from 'react'
import useUnmount from '../hooks/unmount.hook'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import { useSelector } from 'react-redux'
import * as selectors from '../selectors'
import Lot from '../components/Lot'


function ClaimListSection() {
    const { getClaims } = useApi()
    const { refreshDevices } = useDevice()

    const devices = useSelector(selectors.devices)

    const [list, setList] = useState([])

    const load = () => {
        getClaims().then((list) => {
            refreshDevices(list)
            setList(list)
        })
    }

    useUnmount(load)

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Заявки</h2>
                {!list.length && <p className='text'>Наразі у вас нет Заявок</p>}
            </div>

            <div className='list'>
                {list.map((item) =>  devices[item.id]? <Lot device={devices[item.id]} key={item.id} /> : '') }
            </div>
        </>
    )
}

export default ClaimListSection
