import React, { useRef, useState } from "react"
import { ICONS } from "../const"
import '../styles/avatar.css'


export default function Avatar({path, onEdit}) {
    const input = useRef()

    const changeHandler = (event) => {
        if(!event.target.files) { return }
        onEdit(event.target.files)
    }

    return (
        <div className="avatar ml-auto mr-auto">
            <img className="avatar__image" src={path} alt="avatar" />
            <div className="avatar__edit-btn" onClick={() => input.current.click()}>
                <span className="icon">{ICONS.edit}</span>
            </div>
            <input className="avatar__input" type="file" ref={input} onChange={changeHandler}  />
        </div>
    )
}
