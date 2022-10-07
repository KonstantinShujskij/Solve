import { useDispatch } from "react-redux"
import { removeUser, setUser } from '../redux/actions'
import { useCallback } from "react"
import useApi from "./api.hook"


export default function useUser() {
    const dispath = useDispatch()
    const { loadUser } = useApi()
    
    const refreshUser = useCallback(() => loadUser().then((user) => dispath(setUser(user))), [dispath, loadUser])

    const clearUser = useCallback(() => dispath(removeUser()), [dispath])

    return { 
        refreshUser,
        clearUser,
    }
}