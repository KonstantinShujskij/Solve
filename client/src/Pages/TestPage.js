import React from 'react'
import { useSelector } from 'react-redux'
import useApi from '../hooks/api.hook'
import useDevice from '../hooks/devices.hook'
import * as selectors from "../selectors"


function TestPage() {
    const { getDevices } = useApi()
    const { refreshDevices } = useDevice()
    const devices = useSelector(selectors.devices)

    const handler = () => {
        getDevices().then((list) => refreshDevices(list))        
    }

    return (
        <div className='container auth'>
            <h2>devices</h2>
            {Object.keys(devices).map((id) => <div key={id}>{devices[id].model} {devices[id].status}</div>)}
            <br />
            <button className='button' onClick={handler}>click me</button>
        </div>
    )
}

export default TestPage
