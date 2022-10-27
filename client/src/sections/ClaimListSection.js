import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import useScroll from '../hooks/scroll.hook'
import * as selectors from '../selectors'
import Lot from '../components/Lot'

import { AVATAR, FRONT_URL } from '../const'


function ClaimListSection() {
    const { getClaims } = useApi()
    const { refreshDevices } = useDevice()

    const devices = useSelector(selectors.devices)
    const user = useSelector(selectors.user)

    const [list, setList] = useState([])
    const [isEnd, setIsEnd] = useState(false)

    const load = () => {
        if(isEnd) { return }

        getClaims(list.length).then((list) => {
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
            <div className='top-back'>
                <div className='avatar small-avatar mr-auto'>
                    <img className='avatar__image' src={`${FRONT_URL}/store/images/${user.avatar? user.avatar : AVATAR}`} alt="avatar" />
                </div>
            </div>

            <div className='content'>
                <h2 className='title content__title'>Заявки</h2>
                {!list.length && <p className='text'>Наразі у вас нет Заявок</p>}
            </div>

            <div className='list' ref={listRef}>
                {list.map((item) =>  devices[item.id]? <Lot device={devices[item.id]} key={item.id} /> : '') }
            
                <div ref={loadRef} className="load-observer" />
            </div>
        </>
    )
}

export default ClaimListSection
