import React, { useState } from "react"
import useApi from "../hooks/api.hook"
import UserPreview from "./UserPreview"
import '../styles/bet.css'
import useUnmount from "../hooks/unmount.hook";
import { useSelector } from "react-redux";
import * as selectors from '../selectors'
import { useNavigate } from "react-router-dom";


export default function Bet({bet, status='wait'}) {
    const userType = useSelector(selectors.userType)
    
    const { acceptBet, cancelBet, infoUser } = useApi()

    const navigate = useNavigate()

    const [owner, setOwner] = useState(null)

    useUnmount(() => { infoUser({id: bet.owner}).then((data) => setOwner(data)) })

    const acceptHandler = () => { acceptBet({ id: bet._id }).then(() => navigate(0)) }
    const cancelHandler = () => { cancelBet({ id: bet._id }).then(() => navigate(0)) }

    return (
        <div className="card bet">
            <div className="bet__price bet__title">{bet.price} ₴</div>
            <div className="card__hr"></div>
            <div className="bet__text">Коментар: {bet.description}</div>
            <div className="card__hr"></div>
            <div className="card__space"></div>
            {(owner && <UserPreview id={owner._id} avatar={'master.png'} adres="вул. Чарівна, 11" name={owner.name} />)}
            {(userType === 'CLIENT' && <>
                {(status === 'wait' && <button className='button w-100 card__button' onClick={acceptHandler}>Принять</button> )}
                {(status === 'pact' && <button className='button w-100 card__button' onClick={cancelHandler}>Отменить</button> )}
            </>)}
        </div>
    )
}
