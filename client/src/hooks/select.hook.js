import { useState } from "react"

export default function useSelect(initialList = [], mult=true, initialValue=null) {
    const [value, setValue] = useState(initialValue? initialValue : mult? [] : null)
    const [list, setList] = useState(initialList)
    
    const action = (item) => {
        if(list.indexOf(item) === -1) { return }

        if(mult) { multAction(item) }
        else { singleAction(item) }
    }

    const multAction = (item) => {
        const index = value.indexOf(item)
        if(index === -1) { setValue((prv) => [...prv, item]) }
        else {
            const temp = [...value]
            temp.splice(index, 1)
            setValue(temp)
        }
    }

    const singleAction = (item) => {
        if(value === item) { setValue(null) }
        else { setValue(item) }
    } 

    const changeList = (value) => setList(value)

    return { cases: value, changeList, bind: { list, value, action, mult } }
}