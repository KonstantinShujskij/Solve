import { useCallback, useState } from "react"
import { FRONT_URL } from "../const";

export default function useHttp() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method='GET', body=null, headers={}, type='json') => {
        setLoading(true)

        try {
            if(body && type === 'json') { 
                body = JSON.stringify(body) 
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(`${FRONT_URL}/${url}`, {method, body, headers})
            const data = await response.json()

            if(!response.ok) { throw new Error(data.message || "Opss...") }

            setLoading(false)
            return data
        } catch(e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, []);

    const clearError = useCallback(() => setError(null), [])

    return { loading, error, request, clearError }
}