import { useState } from "react"


export default function useValidationInput(defaultValue, validation) {
    const [value, setValue] = useState(defaultValue)

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