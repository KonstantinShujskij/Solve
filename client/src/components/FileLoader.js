import React from "react"
import { ICONS } from "../const"
import '../styles/fileloader.css'

export default function FileLoader({input, list, setList, options}) {

    const triggerHandler = () => input.current.click()

    const changeHandler = (event) => {
        if(!event.target.files) { return }

        const files = Array.from(event.target.files)

        files.forEach((file) => {
            if(!file.type.match('image')) { return }

            const reader = new FileReader()

            reader.onload = (ev) => {
                const time = Date.now()

                setList((prevent) => {
                    if(prevent.length >= options.count) { return [...prevent] }
                    return [...prevent, {img: ev.target.result, file: file, id: time + file.name}]
                })
            }

            reader.readAsDataURL(file)
        })
    }   

    const removeItem = (id) => {
        const newList = list.filter((file) => file.id !== id)
        setList(newList)
    }

    return (
        <div className="loader">
            <input ref={input} onChange={changeHandler} type="file" multiple={options.multi}
                   accept={Array.isArray(options.accept) ? options.accept.join(',') : null} />

            <button className="loader__item loader__button icon" onClick={triggerHandler}>
                {ICONS.plus}
            </button>
            
            {list.map((item) => (
                <div className="loader__item loader__image" key={item.id}>
                    <img src={item.img} alt={item.file.name} />

                    <div className="icon loader-item__dismis" onClick={() => removeItem(item.id)}>
                        {ICONS.close}
                    </div>
                </div>
            ))}
        </div>
    )
}