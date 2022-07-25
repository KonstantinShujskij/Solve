import { useState } from "react"

export default function useSelectSingle(initialValue = []) {
    const [value, setValue] = useState(null)
    const [list, setList] = useState(initialValue)
    
    const changeList = (val) => setList(val)

    return { value, changeList, bind: { list, value, action: setValue } }
}