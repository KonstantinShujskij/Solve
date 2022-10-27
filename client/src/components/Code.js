import React from "react"
import Input from "./base/Input";


export default function Code({code}) {
    return (
        <label className='code'>
            <div className={`code__item ${code.value.length === 0? 'code__item_fill' : ''}`}>
                {code.value[0]? code.value[0] : ''}
            </div>
            <div className={`code__item ${code.value.length === 1? 'code__item_fill' : ''}`}>
                {code.value[1]? code.value[1] : ''}
            </div>
            <div className={`code__item ${code.value.length === 2? 'code__item_fill' : ''}`}>
                {code.value[2]? code.value[2] : ''}
            </div>
            <div className={`code__item ${code.value.length === 3? 'code__item_fill' : ''}`}>
                {code.value[3]? code.value[3] : ''}
            </div>
            <div className={`code__item ${code.value.length === 4? 'code__item_fill' : ''}`}>
                {code.value[4]? code.value[4] : ''}
            </div>
            <div className={`code__item ${code.value.length >= 5? 'code__item_fill' : ''}`}>
                {code.value[5]? code.value[5] : ''}
            </div>

            <div className='code__input'>
                <Input className="" input={code.bind} />
            </div>                
        </label>
    )
}
