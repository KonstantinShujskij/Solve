import React, { useState } from 'react'
import Select from '../components/Select'
import { INFO_CAT_SCREEN, INFO_CONTACT_SCREEN, INFO_MAP_SCREEN, INFO_NAME_SCREEN, INFO_PHONE_SCREEN, 
         INFO_PHOTO_SCREEN, INFO_TITLE_SCREEN, INFO_TYPE_SCREEN } from '../const'
import useMap from '../hooks/map.hook'
import useSelect from '../hooks/select.hook'
import useValidationInput from '../hooks/input.hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import FileLoader from '../components/FileLoader'
import useFileLoad from '../hooks/fileLoad.hook'
import useUser from '../hooks/user.hook'
import useContacts from "../hooks/contacts.hook"
import Contacts from '../components/Contacts'
import useApi from '../hooks/api.hook'
import { useSelector } from 'react-redux'
import * as selectors from '../selectors'
import Input from '../components/base/Input'



function InfoPage() {
    const navigate = useNavigate()
    const { initialMaster, initialClient } = useApi()
    const { refreshUser } = useUser()

    const categories = useSelector(selectors.categories)

    const [type, setType] = useState('') 
    const phone = useValidationInput('')
    const name = useValidationInput('')
    const select = useSelect(categories)
    const { elem, marker } = useMap() 
    const contact = useContacts() 
    const images = useFileLoad({ multi: true, accept: ['.png', '.jpg', '.jpeg'] })

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
        setStack(temp)
        setCurrentPage(page)
    }

    const phoneNextHandler = () => nextHandler(INFO_TYPE_SCREEN)
    const typeMasterNextHandler = () => { nextHandler(INFO_TITLE_SCREEN); setType('MASTER') } 
    const typeClientNextHandler = () => { nextHandler(INFO_NAME_SCREEN); setType('CLIENT') }
    const nameNextHandler = () => nextHandler(INFO_CONTACT_SCREEN)
    const titleNextHandler = () => { nextHandler(INFO_CAT_SCREEN) }
    const catNextHandler = () => nextHandler(INFO_MAP_SCREEN)
    const mapNextHandler = () => { 
        if(marker.current && marker.current.getPosition()) { nextHandler(INFO_PHOTO_SCREEN) }
        else { console.log("местоположение не выбранно"); }
    }
    const photoNextHandler = () => nextHandler(INFO_CONTACT_SCREEN)


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

    return (
        <div className="auth">

        {currentPage === INFO_PHONE_SCREEN && <>
            <div className='title'>Ваше телефон</div>
            <Input input={phone.bind} label='Телефон' ></Input>
            <br />
            <button className='btn btn-lg' disabled={!phone.value} onClick={ phoneNextHandler }>Далі</button>
        </>}
        {currentPage === INFO_TYPE_SCREEN && <>
            <div className='title'>Оберіть тип профіля</div>
            <button className='btn btn-lg btn-big' onClick={ typeClientNextHandler }>Клієнт</button>
            <button className='btn btn-lg btn-big' onClick={ typeMasterNextHandler }>Майстер</button>
        </>}        
        {currentPage === INFO_NAME_SCREEN && <>
            <div className='title'>Ваше ім’я</div>
            <Input input={name.bind} label="Имя"></Input>
            <br />
            <button className='btn btn-lg' disabled={!name.value} onClick={ nameNextHandler }>Далі</button>
        </>}
        {currentPage === INFO_CONTACT_SCREEN && <>
            <div className='title'>Оберіть і додайте зручний для вас мессенджери</div>
            <Contacts {...contact.bind} ></Contacts>
            <button className='btn btn-lg' onClick={() => infoHandler()}>Завершити реєстрацію</button>
        </>}

        {currentPage === INFO_TITLE_SCREEN && <>
            <div className='title'>Назва вашої компанії (якщо немає, то ваше ім’я та прізвище)</div>
            <Input input={name.bind} label='Компания' ></Input>
            <br />
            <button className='btn btn-lg' disabled={!name.value} onClick={ titleNextHandler }>Далі</button>
        </>} 
        {currentPage === INFO_CAT_SCREEN && <>
            <div className='title'>Категорії, з якими ви працюєте</div>
            <Select {...select.bind} />
            <button className='btn btn-lg' 
                    disabled={!select.cases.length} 
                    onClick={ catNextHandler } >Далі</button>
        </>}
        {currentPage === INFO_MAP_SCREEN && <>
            <div className='title'>Позначте ваш сервісний центр на мапі</div>
            <div ref={elem} className='map'></div>
            <button className='btn btn-lg' onClick={ mapNextHandler }>Далі</button>
        </>}
        {currentPage === INFO_PHOTO_SCREEN && <>
            <div className='title'>Додайте фото вашого сервісного центру або ваші</div>
            <FileLoader {...images.bind}></FileLoader>
            <button className='btn btn-lg' onClick={ photoNextHandler }>Далі</button>
        </>}

        {stack.length > 0 && <>
            <button className='back-btn' onClick={ backHandler }>
                <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
        </>}

        </div>
    );
}

export default InfoPage;
