import React from "react"
import '../styles/alert.css'
import * as selectors from '../selectors'
import { useSelector } from "react-redux"


export default function Alert() {
    const mess = useSelector(selectors.mess)
    const error = useSelector(selectors.error)

    return (
        <>
        <div className={`card alert ${mess? 'alert_active': ''}`}>{mess}</div>
        <div className={`card alert ${error? 'alert_active': ''}`}>{error}</div>        
        </>
    )
}