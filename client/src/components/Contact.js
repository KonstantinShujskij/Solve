import React, { useState } from "react"
import Input from './base/Input'
import classNames from 'classnames/bind'


export default function Contact({social, input}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        <div className={classNames({'contact': true, 'contact_active': !!input.value})}
             onClick={() => setIsOpen(true)}>
            <div className="contact__icon">{social.icon}</div>
        </div>

        <div className={classNames({
            'contact__popup': true,
            'container': true,
            'popup': true,
            'popup_open': isOpen
        })}>
            <div className='content'>
                <h2 className='title content__title'>{social.name}</h2>
                <p className='text'>Укажите свой аккаунт</p>
            </div>
            <div className="card">
                <Input input={input.bind} label={social.placeholder}></Input>
                <button className='button w-100 card__button' onClick={() => setIsOpen(false)}>Сохранить</button>
            </div>
        </div>
        </>
    )
}
