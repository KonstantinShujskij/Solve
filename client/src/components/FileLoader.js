import React from "react"
import { MAX_IMAGES } from "../const"

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
                    if(prevent.length >= MAX_IMAGES) { return [...prevent] }
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
        <div className="select">
            <button className="btn btn-lg" onClick={triggerHandler}>Додати</button>
            <input ref={input} onChange={changeHandler} type="file" multiple={options.multi}
                   accept={Array.isArray(options.accept) ? options.accept.join(',') : null} />
            <div className="preview">
                {list.map((item) => (
                    <div className="image" key={item.id} onClick={() => removeItem(item.id)}>
                        <img src={item.img} alt={item.file.name} />
                    </div>
                ))}
            </div>            
        </div>
    )
}