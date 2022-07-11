import React, { useState } from "react"

export default function Contact({social, input}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        <div className={`contact contact_${social.name} ${input.value?'contact_active':null}`}
            onClick={() => setIsOpen(true)}>
            <i className={`fa-brands ${social.icon}`}></i>
        </div>
        <div className={`contact__popup ${isOpen?'contact__popup_open':null}`}>
            <div className="contact__title">Укажите свой аккаунт</div>
            <input className="input" {...input.bind} placeholder={social.placeholder} />
            <button className="btn btn-lg" onClick={() => setIsOpen(false)}>Сохранить</button>
        </div>
        </>
    )
}
