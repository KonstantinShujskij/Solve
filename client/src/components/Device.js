import React, { useState } from "react"
import useApi from "../hooks/api.hook"
import Bet from "./Bet"
import useValidationInput from '../hooks/input.hook'
import '../styles/device.css'
import Contract from "./Contract"


export default function Device({device}) {
    const [isOpen, setIsOpen] = useState(false)
    const [popup, setPopup] = useState('')

    const [bets, setBets] = useState([])

    
    const [contract, setContract] = useState({})

    const contractData = useValidationInput('', () => true)

    const { getBets, cancelBet, acceptContract, getContract } = useApi()

    const showBets = (ids) => {
        getBets({ids}).then((data) => { 
            setPopup('BETS')
            setBets(data) 
        })
        
        setIsOpen(true)
    }

    const showContract = (id) => {
        getContract({id}).then((data) => { 
            setPopup('CONTRACT')
            setContract(data) 
        })
        
        setIsOpen(true)
    }

    const cancelHandler = (id) => {
        cancelBet({ id })
    }

    const acceptHandler = (id) => {
        acceptContract({ id, data: contractData.value }).then(() => {
            setIsOpen(false)
        })
    }

    return (
        <div className="device">
            <div className="device__title">{device.model}</div>
            <div className="device__status">
                {(device.status === 'SEARCH' && <>
                    <div>Ваше устройство выставлено на аукцион</div>
                    <div>Количество ставок: {device.bets.length}</div>
                    <br />
                    <button className="btn" onClick={() => showBets(device.bets)}>Посмотреть сделки</button>
                    <button className="btn">Выбрать сервесный центер</button>
                </>)}
                {(device.status === 'RESERVE' && <>
                    <div>Вы выбрали исполнителем Company</div>
                    <br />
                    <button className="btn" onClick={() => showContract(device.contract)}>Подписать Контракт</button>
                    <button className="btn" onClick={() => cancelHandler(device.bet)}>
                        Отменить свой выбор
                    </button>
                </>)}
                {(device.status === 'CHECK' && <>
                    <div>Вы отправили запрос на ремонт к company</div>
                    <button className="btn">Подписать Контракт</button>
                </>)}
                {(device.status === 'CANCEL' && <>
                    <div>Сервесный центр company которому вы предложили контракт отказался сотрудничать</div>
                    <button className="btn">Выставить заказ на аукцион</button>
                    <button className="btn">Отослать заказ конкретному исполнителю</button>
                </>)}
                {(device.status === 'PACT' && <>
                    <div>Вы заключили КонтракТ с сервисным центром Company </div>
                    <div>Статус: Ожидание трезвых работников</div>
                    <button className="btn">Подтвердить выполнение</button>
                </>)}
                {(device.status === 'CONFIRM' && <>
                    <div>Ваш заказ успешно выполнени сервисным центром Company</div>
                </>)}

                <div className={`device__popup ${isOpen?"device__popup_open":""}`}>

                    {popup === 'BETS' && bets.map((bet) => <Bet bet={bet} key={bet._id} />)}
                    {(popup === 'CONTRACT' && <Contract contract={contract} />)}
                    
                    <button className="btn" onClick={() => { setIsOpen(false) }}>close</button>
                </div>
            </div>
        </div>
    )
}
