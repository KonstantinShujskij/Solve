import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import UserPreview from '../components/UserPreview'
import useAlert from '../hooks/alert.hook'
import useApi from '../hooks/api.hook'
import useValidationInput from '../hooks/input.hook'
import useRating from '../hooks/rating.hook'
import useUnmount from '../hooks/unmount.hook'

function AcceptPage() {
    const { acceptDevice, infoUser } = useApi()
    const { pushMess } = useAlert()
    const params = useParams()
    const navigate = useNavigate()

    const coment = useValidationInput('')
    const timeRating = useRating('Час')
    const priceRating = useRating('Цена')
    const serviceRating = useRating('Сервис')

    const [master, setMaster] = useState({name: ''})

    useUnmount(() => { infoUser(params.owner).then((data) => setMaster(data)) })


    const acceptHandler = () => { 
        const review = {
            coment: coment.value,
            price: priceRating.value,
            time: timeRating.value,
            service: serviceRating.value
        }

        acceptDevice(params.device, review).then((req) => {
            if(req) { 
                pushMess('Контракт завершен')
                navigate(-1)
            }
        }) 
    }

    return (
        <div className='container'>
            <div className='card'>
                <UserPreview id={params.owner} name={master.name} avatar={master.avatar} />
                <div className='card__space'></div>
                <Rating {...timeRating.bind} />
                <Rating {...priceRating.bind} />
                <Rating {...serviceRating.bind} />
                <div className='card__space'></div>
                <textarea className='input textarea' {...coment.bind} placeholder='Коментар'></textarea>
                <button className='w-100 button card__button' onClick={acceptHandler}>Подтвердить</button>
            </div>
            
        </div>
    )
}

export default AcceptPage
