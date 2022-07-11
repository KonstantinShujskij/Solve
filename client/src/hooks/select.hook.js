import { useState } from "react"

export default function useSelect(initialValue = []) {
    const [cases, setCases] = useState([])
    const [list, setList] = useState(initialValue)
    
    const action = (item) => {
        if(list.indexOf(item) === -1) { return }
        
        const index = cases.indexOf(item)
        if(index === -1) { setCases((prv) => [...prv, item]) }
        else {
            const temp = [...cases]
            temp.splice(index, 1)
            setCases(temp)
        }
    }

    const changeList = (value) => setList(value)

    return { cases, changeList, bind: { list, cases, action } }
}