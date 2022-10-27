import { useDispatch, useSelector } from "react-redux"
import { addDevice, removeDevices } from '../redux/actions'
import { useCallback } from "react"
import useApi from "./api.hook"
import * as selectors from "../selectors"


export default function useDevice() {
    const { loadDevice } = useApi()
    const dispatch = useDispatch()

    const devices = useSelector(selectors.devices)



    const refreshDevice = useCallback(async (id) => {
        return loadDevice(id).then((device) => { 
            if(!device) { return }

            dispatch(addDevice(device)) 

            return device
        })
    }, [loadDevice, dispatch])
    
    const refreshDevices = useCallback((list) => {
        list.forEach((device) => { 
            if(devices[device.id] && devices[device.id].updatedAt === device.updatedAt) { return }

            refreshDevice(device.id)
        })
    }, [devices, refreshDevice])

    const clearDevices = useCallback(() => dispatch(removeDevices()), [dispatch])


    return { 
        refreshDevice,
        refreshDevices,
        clearDevices
    }
}