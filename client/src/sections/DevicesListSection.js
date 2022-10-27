import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import useScroll from '../hooks/scroll.hook'
import * as selectors from '../selectors'
import Device from '../components/Device'


function DevicesListSection() {
    const { getDevices } = useApi()
    const { refreshDevices } = useDevice()

    const devices = useSelector(selectors.devices)
    
    const [list, setList] = useState([])
    const [isEnd, setIsEnd] = useState(false)

    const load = () => {
        if(isEnd) { return }

        getDevices(list.length).then((list) => {
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
                <h2 className='title content__title'>Мої пристрої</h2>
                {!list.length && <p className='text'>Наразі жоден ваш пристрій не ремонтується. Натисніть “Створити”, щоб додати пристрій</p>}
            </div>

            <div className='devices' ref={listRef}>
                { list.map((item) => devices[item.id]? <Device device={devices[item.id]} refresh={load} key={item.id} /> : '') }  
           
                <div ref={loadRef} className="load-observer" />
            </div>
        </>
    )
}

export default DevicesListSection
