import { useCallback } from "react"

export default function useMessage() {
    return useCallback((text) => {
        if(text) { alert(text) }
    }, []);
}