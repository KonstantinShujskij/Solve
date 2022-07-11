import { useRef, useState } from "react"

const initialOptions = { multi: false, accept: []  }

export default function useFileLoad(options=initialOptions) {
    const input = useRef()
    const [list, setList] = useState([])

    return {
        list,
        bind: { input, options, list, setList }
    }
}