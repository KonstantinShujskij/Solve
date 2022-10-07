import { useDispatch } from "react-redux"
import { clearError, clearMess, setError, setMess } from '../redux/actions'


export default function useAlert() {
    const dispatch = useDispatch()
    
    const pushMess = (mess) => {
        dispatch(setMess(mess))
        setTimeout(() => {
            dispatch(clearMess())
        }, 1500)  
    }

    const pushError = (error) => {
        dispatch(setError(error))
        setTimeout(() => {
            dispatch(clearError())
        }, 1500)   
    }

    return { 
        pushMess,
        pushError,
    }
}