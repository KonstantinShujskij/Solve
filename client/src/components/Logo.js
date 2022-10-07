import React from "react"
import { FRONT_URL } from "../const"


export default function Logo() {
    return (
        <div className='logo top-back__logo'>
            <img src={`${FRONT_URL}/images/logo.svg`} className='logo__image' alt='logo' />
        </div>
    )
}
