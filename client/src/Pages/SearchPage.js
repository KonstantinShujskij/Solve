import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ICONS } from '../const'
import useApi from '../hooks/api.hook'
import '../styles/profile.css'
import useUnmount from '../hooks/unmount.hook'
import Master from '../components/Master'
import MenuSection from '../sections/MenuSections'


function SearchPage() {
    const navigate = useNavigate()

    const { findMasters } = useApi()

    const [list, setList] = useState([])
    // const [bets, setBets] = useState([])

    useUnmount(() => { findMasters().then((data) => setList(data) ) })

    return (
        <div className='container search-page'>
            <div className='header'>
                <button className='back-btn' onClick={() => navigate(-1)}>
                    <span className='icon'>{ICONS.back}</span>
                </button>

                <div>Search</div>
            </div>

            <div className='list mb-auto'>
                {list.map((id) => <Master id={id} key={id} /> )}
            </div>

            <MenuSection className="mt-auto"/>
        </div>
    )
}

export default SearchPage 
