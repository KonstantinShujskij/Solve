import React from "react"
import useApi from "../hooks/api.hook"
import useValidationInput from '../hooks/input.hook'


export default function Device({device}) {
    const betData = useValidationInput('', () => true)
    const { setBet } = useApi()

    const setBetHandler = async (id) => {
        console.log('set bet');
        await setBet({ id, data: betData.value })
    }

    return (
        <div className="device">
            <div className="device__title">Категория: {device.category}</div>
            <div className="device__title">Модель: {device.model}</div>

            <div className="image">
                {(device.images.length && 
                    <img src={`http://localhost:5000/store/images/${device.images[0]}`} alt="" />
                )}                
            </div>
            <div className="device__description">
                {device.description}
            </div>
            <div>
                <input {...betData.bind} />
                <button onClick={() => setBetHandler(device._id)}>Set Bet</button>
            </div>
        </div>
    )
}
