import { useRef, useState } from "react"

const initialOptions = { multi: false, count: 1, accept: []  }

export default function useFileLoad(options={}) {
    options = {...initialOptions, ...options}
    
    const input = useRef()
    const [list, setList] = useState([])

    return {
        list,
        bind: { input, options, list, setList }
    }
}