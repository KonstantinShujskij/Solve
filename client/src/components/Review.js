import React from "react"
import '../styles/review.css'

function getGoneTime(time) {
    let deltaTime = Date.now() - time
    deltaTime = parseInt(deltaTime / 1000)
    if(deltaTime / 60 < 1) { return `${deltaTime}сек назад` } 

    deltaTime = parseInt(deltaTime / 60)
    if(deltaTime / 60 < 1) { return `${deltaTime}мин назад` } 

    deltaTime = parseInt(deltaTime / 60)
    if(deltaTime / 24 < 1) { return `${deltaTime}час назад` } 

    deltaTime = parseInt(deltaTime / 24)
    if(deltaTime / 30 < 1) { return `${deltaTime}д. назад` } 

    deltaTime = parseInt(deltaTime / 30)
    if(deltaTime / 12 < 1) { return `${deltaTime}м. назад` } 

    deltaTime = parseInt(deltaTime / 12)
    return `${deltaTime}г. назад`
}

export default function Review({review}) {

    return (
        <div className='card review'>

            <div className='review__top'>
                <div className='review__value'>
                    {((review.price + review.service + review.time) / 3).toFixed(1)}
                </div>

                <div className="review__user">
                    <div className="review__name">{review.ownerName}</div>
                    <div className="review__time">{getGoneTime(review.createAt)}</div>
                </div>
            </div>

            <div className='card__hr'></div>

            <div className='review__coment text'>{review.coment}</div>
        
        </div>
    )
}
