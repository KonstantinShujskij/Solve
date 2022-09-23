import React from "react"
import Contact from '../components/Contact'
import { SOCIAL } from "../const"
import '../styles/contacts.css'


export default function Contacts({contacts}) {
    return (
        <div className='contacts'>
            <Contact social={SOCIAL.viber} input={contacts.viber} ></Contact>
            <Contact social={SOCIAL.whatsapp} input={contacts.whatsapp} ></Contact>
            <Contact social={SOCIAL.instagram} input={contacts.instagram} ></Contact>                
            <Contact social={SOCIAL.telegram} input={contacts.telegram} ></Contact>
        </div>
    )
}
