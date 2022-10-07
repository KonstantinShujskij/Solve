import { useState } from "react"


export default function useRating(label='', initialValue=0) {
    const [value, setValue] = useState(initialValue)
    
    return { value, bind: { label, value, setValue } }
} 