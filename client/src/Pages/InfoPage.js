import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { INFO_CAT_SCREEN, INFO_CONTACT_SCREEN, INFO_MAP_SCREEN, INFO_NAME_SCREEN, 
         INFO_PHONE_SCREEN, INFO_PHOTO_SCREEN, INFO_TITLE_SCREEN, INFO_TYPE_SCREEN } from '../const'

import useApi from '../hooks/api.hook'
import useAuth from '../hooks/auth.hook'
import useUser from '../hooks/user.hook'

import useContacts from "../hooks/contacts.hook"
import useFileLoad from '../hooks/fileLoad.hook'
import useMap from '../hooks/map.hook'
import useSelect from '../hooks/select.hook'
import useValidationInput from '../hooks/input.hook'

import * as selectors from '../selectors'

import BackSection from '../sections/BackSection'

import InfoPhoneSection from '../sections/InfoPhoneSection'
import InfoTypeSection from '../sections/InfoTypeSection'
import InfoNameSection from '../sections/InfoNameSection'
import InfoContactSection from '../sections/infoContactSection'
import InfoTitleSection from '../sections/InfoTitleSection'
import InfoCatSection from '../sections/InfoCatSection'
import InfoMapSection from '../sections/InfoMapSection'

import '../styles/infoPage.css'
import InfoPhotoSection from '../sections/InfoPhotoSection';


function InfoPage() {
    const navigate = useNavigate()
    const { initialMaster, initialClient } = useApi()
    const { refreshUser } = useUser()
    const { logout } = useAuth()

    const categories = useSelector(selectors.categories)

    const [type, setType] = useState('') 
    const phone = useValidationInput('')
    const name = useValidationInput('')
    const select = useSelect(categories)
    const { elem, marker } = useMap() 
    const contact = useContacts() 
    const images = useFileLoad({ multi: true, count: 5, accept: ['.png', '.jpg', '.jpeg'] })

    const [currentPage, setCurrentPage] = useState(INFO_PHONE_SCREEN)
    const [stack, setStack] = useState([])

    const nextHandler = (page) => { 
        setCurrentPage((prvPage) => {
            setStack((prvStack) => [...prvStack, prvPage])
            return page
        })
    }

    const backHandler = () => {
        const temp = [...stack]
        const page = temp.pop()
        if(page) {
            setStack(temp)
            setCurrentPage(page)
        }
        else { logout() }        
    }

    const infoHandler = async () => { 
        let initial = initialClient

        const form = new FormData()

        form.append('name', name.value)
        form.append('phone', phone.value)
        form.append('whatsapp', contact.values.whatsapp)
        form.append('facebook', contact.values.facebook)
        form.append('instagram', contact.values.instagram)
        form.append('telegram', contact.values.telegram)        

        if(type === 'MASTER') {
            const position = marker.current? marker.current.getPosition() : null

            console.log(position);

            images.list.forEach((item) => form.append('images', item.file))           
            select.cases.forEach((item) => form.append('cases', item))
            form.append('lat', position? position.lat() : null)
            form.append('lng', position? position.lng() : null)

            initial = initialMaster
        }
        
        if(await initial(form)) { 
            refreshUser()
            navigate("/profile") 
        }
    }

    const currentSection = (screen) => {
        switch(screen) {
            case INFO_PHONE_SCREEN:
                return <InfoPhoneSection {...{phone}} callback={() => nextHandler(INFO_TYPE_SCREEN)} /> 
            case INFO_TYPE_SCREEN:
                return (<InfoTypeSection {...{setType}} clientCallback={() => nextHandler(INFO_NAME_SCREEN)} 
                        masterCallback={() => nextHandler(INFO_TITLE_SCREEN)} />)
            case INFO_NAME_SCREEN:
                return <InfoNameSection {...{name}} callback={() => nextHandler(INFO_CONTACT_SCREEN)} />
            case INFO_CONTACT_SCREEN:
                return <InfoContactSection {...{contact}} callback={infoHandler} />
            case INFO_TITLE_SCREEN:
                return <InfoTitleSection {...{name}} callback={() => nextHandler(INFO_CAT_SCREEN)} />
            case INFO_CAT_SCREEN:
                return <InfoCatSection {...{select}} callback={() => nextHandler(INFO_MAP_SCREEN)} />
            case INFO_MAP_SCREEN:
                return <InfoMapSection {...{elem, marker}} callback={() =>nextHandler(INFO_PHOTO_SCREEN)} />
            case INFO_PHOTO_SCREEN:
                return <InfoPhotoSection {...{images}} callback={() => nextHandler(INFO_CONTACT_SCREEN)} />
            default:
                return <></>
        }
    }

    return (
        <div className="container">
            <BackSection className='mb-auto' handler={backHandler} />
            {currentSection(currentPage)}
        </div>
    )
}

export default InfoPage