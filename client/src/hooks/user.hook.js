import { useDispatch } from "react-redux"
import { removeUser, setUser } from '../redux/actions'
import { useCallback } from "react"
import useApi from "./api.hook"


export default function useUser() {
    const dispath = useDispatch()
    const { loadUser } = useApi()
    
    const refreshUser = useCallback(() => {
        try { loadUser().then((user) => { dispath(setUser(user)) }) }
        catch(e) { console.log(e) }
    }, [dispath, loadUser])

    const clearUser = useCallback(() => dispath(removeUser()), [dispath])

    return { 
        refreshUser,
        clearUser,
    }
}