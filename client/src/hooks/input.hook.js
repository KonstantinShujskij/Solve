import { useEffect, useState } from "react"

const nope = () => {}
const nopeTrue = () => true

export default function useValidationInput(defaultValue, validation=nopeTrue, callback=nope) {
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        if(value === undefined || value === defaultValue) { return }

        callback(value)
    }, [value, defaultValue, callback])

    const onChange = (event) => { 
        const tempValue = event.target.value
        if(validation(tempValue)) { changeValue(tempValue) }       
    }

    const changeValue = (newValue) => { 
        if(newValue !== value) { setValue(newValue) } 
    }

    return {
        bind: { value, onChange },
        value,
        changeValue,
    }
}