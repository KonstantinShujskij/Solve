import React, { useState } from "react"
import classNames from 'classnames/bind'
import '../../styles/input.css'


export default function Input({input, icon, label='', type='input'}) {
    const [focus, setFocus] = useState(false)

    return (
        <div className={classNames({
            'input': true, 
            'input_focus': focus,
            'input_fill': !!input.value,
        })}>
            {(!!icon && 
                <div className={classNames({
                    'icon': true,
                    'input__icon': true,
                    'input__icon_focus': focus,
                    'input__icon_fill': !!input.value,
                })}>{icon}</div>
            )}            

            <input className="input__value" type={type} {...input} placeholder={label}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)} />
        </div>
    )
}