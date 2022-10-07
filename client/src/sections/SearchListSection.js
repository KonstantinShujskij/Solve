import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Lot from '../components/Lot'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import useUnmount from '../hooks/unmount.hook'
import * as selectors from '../selectors'

function SearchListSection() {
    const { getLots } = useApi()
    const { refreshDevices } = useDevice()

    const devices = useSelector(selectors.devices)

    const [list, setList] = useState([])

    const load = () => {
        getLots().then((list) => {
            refreshDevices(list)
            setList(list)
        })
    }

    useUnmount(load)

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Аукціони</h2>
            </div>

            <div className='list'>
                {list.map((item) =>  devices[item.id]? <Lot device={devices[item.id]} key={item.id} /> : '') }
            </div>
            
        </>
    )
}

export default SearchListSection
