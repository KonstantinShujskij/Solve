import { useDispatch, useSelector } from "react-redux"
import { addDevice, removeDevices } from '../redux/actions'
import { useCallback } from "react"
import useApi from "./api.hook"
import * as selectors from "../selectors"


export default function useDevice() {
    const { loadDevice } = useApi()
    const dispatch = useDispatch()

    const devices = useSelector(selectors.devices)

    
    const refreshDevices = useCallback((list) => {
        list.forEach((device) => {
            if(devices[device.id] && devices[device.id].updatedAt === device.updatedAt) { return }
            
            loadDevice(device.id).then((device) => { dispatch(addDevice(device)) })
        })
    }, [loadDevice, dispatch, devices])

    const clearDevices = useCallback(() => dispatch(removeDevices()), [dispatch])


    return { 
        refreshDevices,
        clearDevices
    }
}