import React from "react"
import { ICONS } from "../const"


export default function ContactPreview({user}) {
    return (
        <>
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
        </>
    )
}
