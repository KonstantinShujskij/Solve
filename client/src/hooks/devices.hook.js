import { useDispatch } from "react-redux"
import { removeDevices, setDevices } from '../redux/actions'
import { useCallback } from "react"
import useApi from "./api.hook"


export default function useDevice() {
    const dispath = useDispatch()
    const { loadDevices } = useApi()
    
    const refreshDevices = useCallback(() => {
        try { loadDevices().then((data) => { dispath(setDevices(data)) }) }
        catch(e) { console.log(e) }
    }, [dispath, loadDevices])

    const clearDevice = useCallback(() => dispath(removeDevices()), [dispath])

    return { 
        refreshDevices,
        clearDevice,
    }
}