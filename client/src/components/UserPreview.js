import React from "react"
import { Link } from "react-router-dom";
import '../styles/preview.css'
import { AVATAR, FRONT_URL } from "../const";


export default function UserPreview({id, name, avatar=AVATAR}) {
    return (
        <div className="preview">
            <div className="preview__avatar">
                <img className="preview__img" src={`${FRONT_URL}/store/images/${avatar}`} alt="avatar" />
            </div>

            <div className="preview__info">
                <Link className="subtitle preview__link" to={`/profile/${id}`}>{name}</Link>
                <div className="text">вул. Чарівна, 11</div>
            </div>
        </div>
    )
}
