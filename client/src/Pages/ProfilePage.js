import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FRONT_URL, ICONS, AVATAR } from '../const'
import useApi from '../hooks/api.hook'
import '../styles/profile.css'
import useUnmount from '../hooks/unmount.hook'
import BackSection from '../sections/BackSection'
import Review from '../components/Review'
import MenuSection from '../sections/MenuSections'
import { useSelector } from 'react-redux'
import * as selectors from '../selectors'


function getMedium(arr, none=0) {
    if(arr.length === 0) { return none }
    return arr.reduce((sum, value) => (sum + value)) / arr.length
}

function ProfilePage() {
    const params = useParams()

    const { infoUser, sendDevice } = useApi()

    const [user, setUser] = useState({name: '', phone: '', avatar: AVATAR, reviews: []})

    const currentDevice = useSelector(selectors.currentDevice)

    useUnmount(() => { infoUser(params.id).then((user) => setUser(user)) })

    const sendHandler = () => {
        sendDevice(currentDevice, params.id).then((res) => {
            console.log(res);
        })
    }

    return (
        <div className='container profile'>
            <BackSection className="header_spase">
                <div className='title mr-auto'>{user? user.name : ''}</div>
            </BackSection>

            <div className='list'>
                <div className='avatar avatar-profile'>
                    <img className='avatar__image' src={`${FRONT_URL}/store/images/${user.avatar}`} alt="avatar" />
                </div>

                {user.reviews.length > 0 && <>
                <div className='content'>
                    <div className='profile__rating rating'>
                        <div className='rating__item'>
                            <div className='rating__value'>
                                {getMedium(user.reviews.map((review) => review.time)).toFixed(1)}
                            </div>
                            <div className='rating__label'>Час</div>
                        </div>
                        <div className='rating__item'>
                            <div className='rating__value'>
                                {getMedium(user.reviews.map((review) => review.price)).toFixed(1)}
                            </div>
                            <div className='rating__label'>Ціна</div>
                        </div>
                        <div className='rating__item'>
                            <div className='rating__value'>
                                {getMedium(user.reviews.map((review) => review.service)).toFixed(1)}
                            </div>
                            <div className='rating__label'>Сервіс</div>
                        </div>
                    </div>

                    <div className='text text-center'>Усьго: {user.reviews.length} відгуків</div>
                </div>
                </>}

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
                        <a className={`profile__social ${!user.telegram? 'profile__social_none' : ''}`}  
                           href={`https://t.me/${user.telegram}`} target="_blank" rel="noreferrer">{ICONS.telegram}</a>
                        <a className={`profile__social ${!user.viber? 'profile__social_none' : ''}`}  
                           href={`viber://chat?number=%2B${user.viber}`} target="_blank" rel="noreferrer">{ICONS.viber}</a>
                        <a className={`profile__social ${!user.instagram? 'profile__social_none' : ''}`}  
                           href={`https://instagram.com/${user.instagram}`} target="_blank" rel="noreferrer">{ICONS.instagram}</a>
                        <a className={`profile__social ${!user.whatsapp? 'profile__social_none' : ''}`}  
                           href={`https://wa.me/${user.whatsapp}`} target="_blank" rel="noreferrer">{ICONS.whatsapp}</a>
                    </div>
                    <div className='profile__adres'>
                        <img className='profile-adres__icon' src={`${FRONT_URL}/images/map-point.svg`} alt='map' />
                        <div className='profile-adres__info'>
                            <div className='profile-adres__sity'>м.Львів</div>
                            <div className='profile-adres__street'>вул. Чарівна, 11</div>
                        </div>
                    </div>
                </div>

                {currentDevice && <>
                    <div className="card__space"></div>
                    <button className='button w-100' onClick={sendHandler}>Подати запит</button>
                </>}                

                <div className="separator">
                    <div className="separator__hr"></div>
                    <span className="separator__text text">Відгуки</span>
                    <div className="separator__hr"></div>
                </div>

                {user.reviews.map((review) => <Review review={review} key={review.createAt} />)}
            </div>

            <MenuSection />
        </div>
    )
}

export default ProfilePage 
