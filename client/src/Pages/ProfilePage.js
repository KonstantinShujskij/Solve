import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FRONT_URL, ICONS } from '../const'
import useApi from '../hooks/api.hook'
import '../styles/profile.css'
import useUnmount from '../hooks/unmount.hook'


function ProfilePage() {
    const params = useParams()
    const navigate = useNavigate()

    const { infoUser } = useApi()

    const [user, setUser] = useState({name: '', phone: '', })

    useUnmount(() => { infoUser({ id: params.id}).then((data) => setUser(data)) })

    return (
        <div className='container'>
            <div className='header'>
                <button className='back-btn' onClick={() => navigate(-1)}>
                    <span className='icon'>{ICONS.back}</span>
                </button>

                <div className='title mr-auto'>{user.name}</div>
            </div>

            <div className='list'>
                <div className='avatar avatar-profile'>
                    <img className='avatar__image' src={`${FRONT_URL}/images/master.png`} alt="avatar" />
                </div>

                <div className='content'>
                    <div className='profile__rating rating'>
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

                    <div className='text text-center'>Усьго: 30 відгуків</div>
                </div>

                <div className="separator">
                    <div className="separator__hr"></div>
                    <span className="separator__text text">Контакти</span>
                    <div className="separator__hr"></div>
                </div>

                <div className='card'>
                    <a className='profile__phone' href={`tel:${user.phone}`}>
                        <div className='icon profile-phone__icon'>{ICONS.mobile}</div>
                        <div>{user.phone}</div>
                    </a>
                    <div className='profile__social-list'>
                        <div className='profile__social'>{ICONS.telegram}</div>
                        <div className='profile__social'>{ICONS.viber}</div>
                        <div className='profile__social'>{ICONS.instagram}</div>
                        <div className='profile__social'>{ICONS.whatsapp}</div>
                    </div>
                    <div className='profile__adres'>
                        <img className='profile-adres__icon' src={`${FRONT_URL}/images/map-point.svg`} alt='map' />
                        <div className='profile-adres__info'>
                            <div className='profile-adres__sity'>м.Львів</div>
                            <div className='profile-adres__street'>вул. Чарівна, 11</div>
                        </div>
                    </div>
                </div>

                <div className="separator">
                    <div className="separator__hr"></div>
                    <span className="separator__text text">Відгуки</span>
                    <div className="separator__hr"></div>
                </div>

                <div className='card'>
                    <div className='d-flex'>
                        <div className='rating__value'>5</div>

                        <div>
                            <div>Anna</div>
                            <div>3 місяці тому</div>
                        </div>
                    </div>

                    <div className='card__hr'></div>

                    <div className='text'>Класний сервіс, при вході наливають ягер, всім рекомендую</div>
                </div>

                <button className='button w-100'>Подати запит</button>
                
            </div>
        </div>
    )
}

export default ProfilePage 
