import React, { useState } from "react"

export default function SelectSingle({list, value, action}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="select">
            <button className="btn btn-lg" onClick={() => { setIsOpen(true) }}>{value?value:'Выбрать'}</button>
            <div className={`select__list ${isOpen?"select__list_open":null}`}>
                <div className="select__items">
                    {list.map((item) => {
                        const isSelect = (item === value)
                        return (<div className={`select__item ${isSelect?"select__item_select":null}`} 
                                     onClick={() => { action(item) }} key={item}>{item}</div>)
                    })}
                </div>
                <button className="btn btn-lg" onClick={() => { setIsOpen(false) }}>Выбрать</button>
            </div>
        </div>
    )
}