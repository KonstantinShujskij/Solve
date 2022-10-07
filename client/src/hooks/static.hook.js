import { useDispatch } from "react-redux"
import { removeCategories, setCategories } from '../redux/actions'
import { useCallback } from "react"
import useApi from "./api.hook"


export default function useStatic() {
    const dispath = useDispatch()
    const { getCategories } = useApi()
    
    const refreshCategories = useCallback(() => {
        getCategories().then(({categories}) => { dispath(setCategories(categories)) })
    }, [dispath, getCategories])

    const clearCategories = useCallback(() => dispath(removeCategories()), [dispath])

    const refreshStatic = () => {
        refreshCategories()
    }

    const clearStatic = () => {
        clearCategories()
    }

    return { 
        refreshCategories,
        clearCategories,
        refreshStatic,
        clearStatic,
    }
}