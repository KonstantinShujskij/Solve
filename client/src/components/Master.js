import React, { useState } from "react"
import '../styles/preview.css'
import useUnmount from '../hooks/unmount.hook'
import useApi from '../hooks/api.hook'
import UserPreview from "./UserPreview"

function getMedium(arr, none=0) {
    if(arr.length === 0) { return none }
    return arr.reduce((sum, value) => (sum + value)) / arr.length
}


export default function Master({id}) {
    const {infoUser} = useApi()
    const [master, setMaster] = useState({name: '', reviews: []}) 

    useUnmount(() => { infoUser(id).then((data) => setMaster(data)) })

    return (
        <div className='card master-card'>
            <UserPreview id={id} name={master.name} avatar={master.avatar} />

            <div className="separator">
                <div className="separator__hr"></div>
                <span className="separator__text text">Відгуки</span>
                <div className="separator__hr"></div>
            </div>

            <div className='rating w-100'>
                <div className='rating__item'>
                    <div className='rating__value'>
                        {getMedium(master.reviews.map((review) => review.time)).toFixed(1)}
                    </div>
                    <div className='rating__label'>Час</div>
                </div>
                <div className='rating__item'>
                    <div className='rating__value'>
                        {getMedium(master.reviews.map((review) => review.price)).toFixed(1)}
                    </div>
                    <div className='rating__label'>Ціна</div>
                </div>
                <div className='rating__item'>
                    <div className='rating__value'>
                        {getMedium(master.reviews.map((review) => review.service)).toFixed(1)}
                    </div>
                    <div className='rating__label'>Сервіс</div>
                </div>
            </div>
        </div>
    )
}
