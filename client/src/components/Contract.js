import React from "react"
import useApi from "../hooks/api.hook"
import { useNavigate } from "react-router-dom";
import Input from "./base/Input"
import useValidationInput from "../hooks/input.hook";


export default function Contract({contract}) {
    const { acceptBet } = useApi()
    const navigate = useNavigate()

    const value = useValidationInput(contract.data)

    const acceptHandler = (id) => {
        acceptBet({ id })
        navigate('/')
    }

    return (
        <div className="contract">
            <Input input={value.bind}></Input>
            <br />
            <div className='buttons-row'>
                <div className={`btn buttons-row__btn`}>{contract.masterAccept?'Подтверждено':'не подтверждено'}</div>
                <button className='btn buttons-row__btn' onClick={() => acceptHandler(contract._id)}>Подтвердить</button>
            </div>
        </div>        
    )
}
