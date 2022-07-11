import { useCallback, useEffect, useState } from "react"

const storageName = 'userData';

export default function useAuth() {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isCompletely, setIsCompletely] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id, completely) => {
        setToken(jwtToken)
        setUserId(id)
        setIsCompletely(completely)

        const data = { token: jwtToken, userId: id, isCompletely: completely }
        localStorage.setItem(storageName, JSON.stringify(data))

    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setIsCompletely(null)
        localStorage.removeItem(storageName)
    }, [])

    const inform = useCallback(() => {
        setIsCompletely(true)

        const data = JSON.parse(localStorage.getItem(storageName))
        localStorage.setItem(storageName, JSON.stringify({...data, isCompletely: true}))        
    }, []) 

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data) { login(data.token, data.userId, data.isCompletely) }

        setReady(true)
    }, [login])

    return { login, logout, inform, token, userId, isCompletely, ready }
}