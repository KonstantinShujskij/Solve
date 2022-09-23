import React, { useState } from 'react'
import Lot from '../components/Lot'
import useApi from '../hooks/api.hook'
import useUnmount from '../hooks/unmount.hook'


function SearchListSection() {
    const { loadLots } = useApi()

    const [list, setList] = useState([])

    useUnmount(() => { 
        loadLots().then((lots) => setList(lots))
    })

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Аукціони</h2>
            </div>

            <div className='list'>
                {list.map(lot => <Lot device={lot} key={lot._id} />) }
            </div>
            
        </>
    )
}

export default SearchListSection
