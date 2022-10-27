import React, { useState } from "react"
import useApi from "../hooks/api.hook"
import UserPreview from "./UserPreview"
import '../styles/bet.css'
import useUnmount from "../hooks/unmount.hook";
import { useSelector } from "react-redux";
import * as selectors from '../selectors'
import useAlert from "../hooks/alert.hook";


export default function Bet({bet, refresh}) {
    const { acceptBet, cancelBet, infoUser } = useApi()
    const { pushMess } = useAlert()

    const userId = useSelector(selectors.userId)

    const [owner, setOwner] = useState(null)

    const acceptHandler = () => { acceptBet(bet._id).then((res) => {
        if(res) {
            pushMess('Исполнитель выбран')
            refresh()
        }        
    })}

    const cancelHandler = () => { cancelBet(bet._id).then((res) => {
        if(res) {
            pushMess('Выбор сполнителя отменен')
            refresh()
        }        
    })}

    const load = () => { infoUser(bet.owner).then((user) => setOwner(user)) }

    useUnmount(load)

    return (
        <div className="card bet">
            <div className="bet__price bet__title">{bet.price} ₴</div>
            <div className="card__hr"></div>
            <div className="bet__text">Коментар: {bet.description}</div>
            <div className="card__hr"></div>
            <div className="card__space"></div>
            {(owner && <UserPreview id={owner._id} name={owner.name} avatar={owner.avatar} />)}

            {(bet.accept && bet.owner === userId && 
                <button className='button w-100 card__button red' onClick={cancelHandler}>Отказаться</button>
            )}

            {(bet.accept && bet.client === userId && <>
                <button className='button w-100 card__button' onClick={cancelHandler}>Отменить</button>
            </>)}

            {(!bet.accept && bet.client === userId && 
                <button className='button w-100 card__button' onClick={acceptHandler}>Принять</button>
            )}
        </div>
    )
}
