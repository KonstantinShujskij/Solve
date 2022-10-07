import React from "react"
import { Link } from "react-router-dom"
import { ICONS } from "../const"


function timeToDate(time) {
    const date = new Date(time)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 5)
}

export default function Lot({device}) {

    return (
        <div className="card device">
            <div className="device__row device__label">
                <div className="device__icon icon" style={{color: "#5F6C7B"}}>{ICONS.label}</div>
                <div className="device__text">
                    <p>Категорія: {device.category}</p>
                </div>
            </div>
            <div className="w-100 text lot__time">{timeToDate(device.createdAt)}</div>
            <div className="device__row">
                <div className="device__icon icon">{ICONS.model}</div>
                <Link className="device__title" to={`/device/${device._id}`}>{device.model}</Link>
            </div>
            <div className="card__hr"></div>
            <div className="device__row">
                <div className="device__icon icon">{ICONS.info}</div>
                <div className="device__text">
                    <p>{device.description}</p>
                </div>
            </div>
            {(device.status === 'SEARCH' && <>
                <div className="card__hr"></div>
                <div className="device__row">
                    <div className="device__icon icon">{ICONS.bet}</div>
                    <div className="device__text">
                        <p>Ставок:</p>
                        <p>{device.bets? device.bets.length : ''}</p>
                    </div>
                </div>
            </>)}

        </div>
    )
}
