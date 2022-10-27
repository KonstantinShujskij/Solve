import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Lot from '../components/Lot'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import useScroll from '../hooks/scroll.hook'
import * as selectors from '../selectors'

function SearchListSection() {
    const { getLots } = useApi()
    const { refreshDevices } = useDevice()

    const devices = useSelector(selectors.devices)

    const [list, setList] = useState([])
    const [isEnd, setIsEnd] = useState(false)

    const load = () => {
        if(isEnd) { return }

        getLots(list.length).then((list) => {
            if(!list.length) { setIsEnd(true); return }
            
            refreshDevices(list)

            setList((prev) => {
                const ids = prev.map((item) => item.id)
                list = list.filter((item) => !ids.includes(item.id))
                return [...prev, ...list]
            })
        })
    }

    const listRef = useRef()
    const loadRef = useRef()
    useScroll(listRef, loadRef, load)

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Аукціони</h2>
            </div>

            <div className='list' ref={listRef}>
                {list.map((item) => devices[item.id]? <Lot device={devices[item.id]} key={item.id} /> : '') }

                <div ref={loadRef} className="load-observer" />
            </div>
        </>
    )
}

export default SearchListSection
