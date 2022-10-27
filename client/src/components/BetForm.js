import { useState } from "react"
import Input from './base/Input'


export default function BetForm({price, description, handler}) {
    const [isBeting, setIsBeting] = useState(false)

    return (
        <>
            {(!isBeting && 
                <button className='button w-100' onClick={() => setIsBeting(true)}>Взяти Участь</button> 
            )}

            {(isBeting && <>
                <div className='card'>
                    <Input input={price.bind} label="Ваша ставка" />
                    <div className='card__space'></div>
                    <textarea className='input textarea' {...description.bind} placeholder='Коментар'></textarea>
                    <button className='w-100 button card__button' onClick={handler}>Зробити Ставку</button>
                </div>
            </>)}
        </>
    )
}
