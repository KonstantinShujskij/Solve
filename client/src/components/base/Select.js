import React, { useState } from "react"
import classNames from 'classnames/bind'
import { ICONS } from "../../const"
import '../../styles/select.css'

export default function Select({list, value, action, mult, label='Выбрать'}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="select">
            <button className="w-100 select__value" onClick={() => { setIsOpen(true) }}>
                {(!mult && value)? value : label}
            </button>
            
            {(mult && 
                <div className="select__cases">
                    {value.map((item) => (<div className="select__case" key={item}>
                        <span>{item}</span>
                        <span className="icon case__dismis" onClick={() => { action(item) }}>{ICONS.close}</span>
                    </div>))}
                </div>
            )}

            <div className={classNames({ 'container': true, 'popup': true, 'popup_open': isOpen })}>
                <div className="select__items">
                    {list.map((item) => {
                        const isSelect = mult? (value.indexOf(item) !== -1) : (value === item)

                        return (<div className={classNames({
                            'select__item': true,
                            'select__item_select': isSelect
                        })} onClick={() => { action(item) }} key={item}>{item}</div>)
                    })}
                </div>
                <button className="button w-100 red" onClick={() => { setIsOpen(false) }}>Выбрать</button>
            </div>
        </div>
    )
}