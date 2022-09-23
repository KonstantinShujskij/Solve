import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FRONT_URL } from '../const';
import SocialSection from '../sections/SocialSection';
import '../styles/welcomePage.css'

function Welcom() {
    const navigate = useNavigate()

    return (
        <div className='container welcome'>
            <div className='seal welcome__seal'>
                <img className='seal__image' src={`${FRONT_URL}/images/welcome.png`} alt="seal" />
            </div>
            <div className='card'>
                <div className='logo card__logo'>
                    <img src={`${FRONT_URL}/images/logo.svg`} className='logo__image' alt='logo' />
                </div>
                <div className='welcome__title'>
                    <h2 className='subtitle card__title'>Вітаємо у додатку SOLVE!</h2>
                    <p className='text card__text'>Декілька слів привітання/слоган</p>
                </div>
                <button className='button w-100 card__button' onClick={() => navigate('/auth/login')}>Увійти</button>
                <button className='button red w-100 card__button' onClick={() => navigate('/auth/signup')}>Створити аккаунт</button>
            </div>

            <SocialSection className={'w-100'}/>
        </div>
    );
}

export default Welcom
