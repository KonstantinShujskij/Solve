import React from "react"
import { ICONS } from "../const"
import '../styles/rating.css'


export default function Rating({label, value, setValue}) {

    return (
        <div className="rating-form">
            <div className="rating-form__label">{label}</div>

            <div className={`rating-form__star ${value > 0? 'rating-form__star_active' : null}`} onClick={() => setValue(1)}>
                <div className="icon">{ICONS.star}</div>
            </div>
            <div className={`rating-form__star ${value > 1? 'rating-form__star_active' : null}`} onClick={() =>setValue(2)}>
                <div className="icon">{ICONS.star}</div>
            </div>
            <div className={`rating-form__star ${value > 2? 'rating-form__star_active' : null}`} onClick={() => setValue(3)}>
                <div className="icon">{ICONS.star}</div>
            </div>
            <div className={`rating-form__star ${value > 3? 'rating-form__star_active' : null}`} onClick={() => setValue(4)}>
                <div className="icon">{ICONS.star}</div>
            </div>
            <div className={`rating-form__star ${value > 4? 'rating-form__star_active' : null}`} onClick={() => setValue(5)}>
                <div className="icon">{ICONS.star}</div>
            </div>
        </div>
    )
}
