import { useEffect } from "react"
import { useDispatch, useSelector  } from "react-redux"
import { toLogin, toLogout } from "../redux/actions"
import useUser from "./user.hook"
import * as selectors from '../selectors'
import useStatic from "./static.hook"

export default function useAuth() {
    const dispath = useDispatch()
    const token = useSelector(selectors.token)
    const isUser = !!useSelector(selectors.userId)
    const { refreshUser, clearUser } = useUser()
    const { refreshStatic, clearStatic } = useStatic()
    
    useEffect(() => { 
        if(token && !isUser) { refreshUser() }
        if(!token && isUser) { clearUser() }
    }, [token, isUser, refreshUser, clearUser])

    const login = (userToken, userId) => { 
        dispath(toLogin(userToken, userId)) 
        refreshStatic()
    }

    const logout = () => { 
        dispath(toLogout()) 
        clearStatic()
    }

    return { login, logout }
}