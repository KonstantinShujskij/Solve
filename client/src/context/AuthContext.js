import { createContext } from "react"

const AuthContext = createContext({
    token: null,
    userId: null,
    login: () => {},
    logout: () => {},
    inform: () => {},
    isAuthenticated: false,
    isCompletely: false
});

export default AuthContext