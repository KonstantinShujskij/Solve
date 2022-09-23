import React from 'react'
//import { useSelector } from "react-redux"

import { Outlet } from "react-router-dom";
import { FRONT_URL } from '../const';
//import useApi from '../hooks/api.hook';
//import * as selectors from '../selectors'
//import Lot from '../components/Lot'
//import useUnmount from '../hooks/unmount.hook';
import MenuSection from '../sections/MenuSections'


function MasterPage() {
    //const user = useSelector(selectors.user)

    //const [myDevice, setMyDevice] = useState([])
    //const [isOpen, setIsOpen] = useState(false)
    //const [contract, setContract] = useState({})

    //const contractData = useValidationInput('', () => true)

    // const acceptHandler = (id) => {
    //     acceptContract({ id, data: contractData.value }).then(() => {
    //         setIsOpen(false)
    //     })
    // }

    // const showContract = (id) => {
    //     getContract({id}).then((data) => { 
    //         setContract(data) 
    //     })
        
    //     setIsOpen(true)
    // }

    return (
        <div className='container master'>
            <div className='content'>
                <div className='avatar small-avatar'>
                    <img className='avatar__image' src={`${FRONT_URL}/images/avatar.png`} alt="avatar" />
                </div>
            </div>

            <Outlet />

            <MenuSection />
        </div>
    )
}

export default MasterPage
