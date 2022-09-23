import React from "react"
import { Link } from "react-router-dom";
import '../styles/preview.css'
import { FRONT_URL } from "../const";

export default function UserPreview({id, name, adres, avatar}) {

    return (
        <div className="preview">
            <div className="preview__avatar">
                <img className="preview__img" src={`${FRONT_URL}/images/${avatar}`} />
            </div>

            <div className="preview__info">
                <Link className="subtitle preview__link" to={`/profile/${id}`}>{name}</Link>
                <div className="text">{adres}</div>
            </div>
        </div>
    )
}
