import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ICONS } from '../const'
import UserPreview from '../components/UserPreview'
//import useApi from '../hooks/api.hook'
import '../styles/profile.css'
//import useUnmount from '../hooks/unmount.hook'


function SearchPage() {
    const navigate = useNavigate()

    //const { infoUser } = useApi()

    //const [user, setUser] = useState(null)
    // const [bets, setBets] = useState([])

    //useUnmount(() => { infoUser({ id: params.id}).then((data) => setUser(data) ) })

    return (
        <div className='container'>
            <div className='header'>
                <button className='back-btn' onClick={() => navigate('/')}>
                    <span className='icon'>{ICONS.back}</span>
                </button>

                <div>Search</div>
            </div>

            <div className='card'>
                <UserPreview id={'00'} avatar={'master.png'} adres="вул. Чарівна, 11" name={'company'} />

                <div className="separator">
                    <div className="separator__hr"></div>
                    <span className="separator__text text">Відгуки</span>
                    <div className="separator__hr"></div>
                </div>

                <div className='rating w-100'>
                    <div className='rating__item'>
                        <div className='rating__value'>5</div>
                        <div className='rating__label'>Час</div>
                    </div>
                    <div className='rating__item'>
                        <div className='rating__value'>4.8</div>
                        <div className='rating__label'>Ціна</div>
                    </div>
                    <div className='rating__item'>
                        <div className='rating__value'>5</div>
                        <div className='rating__label'>Сервіс</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchPage 
