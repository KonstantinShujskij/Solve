import React from "react"
import useApi from "../hooks/api.hook"
import { useNavigate } from "react-router-dom";


export default function Bet({bet}) {
    const { acceptBet } = useApi()
    const navigate = useNavigate()

    const acceptHandler = (id) => {
        acceptBet({ id })
        navigate('/')
    }

    return (
        <div className="bet">
            <div>{bet.ownerName}</div>
            <div>{bet.data}</div>
            <br />
            <button className="btn" onClick={() => acceptHandler(bet._id)}>Принять</button>
        </div>
    )
}
