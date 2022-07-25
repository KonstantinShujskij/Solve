import React, { useState } from "react"
import classNames from 'classnames/bind'
import '../../styles/input.css'

export default function Input({input, label='', type='input'}) {
    const [focus, setFocus] = useState(false)

    return (
        <div className={classNames({
            'input': true, 
            'input_focus': focus,
            'input_fill': !!input.value
        })}>
            <div className={classNames({
                'input__placeholder': true,
                'input__placeholder_focus': focus,
                'input__placeholder_fill': !!input.value,
            })}>{label}</div>
            <input className="input__value" type={type} {...input} 
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)} />
        </div>
    )
}