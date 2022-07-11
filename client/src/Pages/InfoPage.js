import React, { useContext, useEffect, useState } from 'react'
import Select from '../components/Select'
import { INFO_CAT_SCREEN, INFO_CONTACT_SCREEN, INFO_MAP_SCREEN, INFO_NAME_SCREEN, INFO_PHONE_SCREEN, INFO_PHOTO_SCREEN, INFO_TITLE_SCREEN, INFO_TYPE_SCREEN, SOCIAL } from '../const'
import useMap from '../hooks/map.hook'
import useHttp from '../hooks/http.hook'
import useSelect from '../hooks/select.hook'
import useValidationInput from '../hooks/input.hook'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import Contact from '../components/Contact'
import FileLoader from '../components/FileLoader'
import useFileLoad from '../hooks/fileLoad.hook'
import useMessage from '../hooks/message.hook'



function InfoPage() {
    const navigate = useNavigate()
    const { token, inform, logout } = useContext(AuthContext)    
    const { error, request, clearError } = useHttp()
    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const [currentPage, setCurrentPage] = useState(INFO_PHONE_SCREEN)
    const [stack, setStack] = useState([])

    const [type, setType] = useState('') 
    const phone = useValidationInput('', () => true)
    //const code = useValidationInput('', () => true)
    const name = useValidationInput('', () => true)
    const select = useSelect()
    const { elem, marker } = useMap() 

    const telegram = useValidationInput('', () => true)
    const instagram = useValidationInput('', () => true)
    const facebook = useValidationInput('', () => true)
    const whatsapp = useValidationInput('', () => true)
   
    const images = useFileLoad({ multi: true, accept: ['.png', '.jpg', '.jpeg'] })

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
    const titleNextHandler = () => {
        request('/api/info/get-categories', 'POST').then(({categories}) => {
            if(categories) { select.changeList(categories) }
            nextHandler(INFO_CAT_SCREEN)
        })        
    }
    const catNextHandler = () => nextHandler(INFO_MAP_SCREEN)
    const mapNextHandler = () => { 
        if(marker.current && marker.current.getPosition()) { nextHandler(INFO_PHOTO_SCREEN) }
        else { console.log("местоположение не выбранно"); }
    }
    const photoNextHandler = () => nextHandler(INFO_CONTACT_SCREEN)


    const infoHandler = async () => { 
        const query = `/api/user/set-info-${type.toLowerCase()}`
        const position = marker.current? marker.current.getPosition() : null

        const form = new FormData()

        form.append('name', name.value)
        form.append('phone', phone.value)
        form.append('whatsapp', whatsapp.value)
        form.append('facebook', facebook.value)
        form.append('instagram', instagram.value)
        form.append('telegram', telegram.value)

        if(type === 'MASTER') {
            images.list.forEach((item) => form.append('images', item.file))           
            select.cases.forEach((item) => form.append('cases', item))
            form.append('lat', position? position.lat() : null)
            form.append('lng', position? position.lng() : null)
        }

        try { 
            const { edit } = await request(query, 'POST', form, {Authorization: `Bearer ${token}`}, 'form') 
            if(edit) { inform(); navigate("/profile") }
        }
        catch(e) { 
            if(e.message === 'Not Authorization') { logout() }
            console.log(e.message)
        }
    }

    return (
        <div className="auth">

        {currentPage === INFO_PHONE_SCREEN && <>
            <div className='title'>Ваше телефон</div>
            <input className='input' placeholder='ввести' {...phone.bind} />
            <button className='btn btn-lg' disabled={!phone.value} onClick={ phoneNextHandler }>Далі</button>
        </>}
        {currentPage === INFO_TYPE_SCREEN && <>
            <div className='title'>Оберіть тип профіля</div>
            <button className='btn btn-lg btn-big' onClick={ typeClientNextHandler }>Клієнт</button>
            <button className='btn btn-lg btn-big' onClick={ typeMasterNextHandler }>Майстер</button>
        </>}        
        {currentPage === INFO_NAME_SCREEN && <>
            <div className='title'>Ваше ім’я</div>
            <input className='input' placeholder='ввести' {...name.bind} />
            <button className='btn btn-lg' disabled={!name.value} onClick={ nameNextHandler }>Далі</button>
        </>}
        {currentPage === INFO_CONTACT_SCREEN && <>
            <div className='title'>Оберіть і додайте зручний для вас мессенджери</div>
            <div className='contacts'>
                <Contact social={SOCIAL.facebook} input={facebook} ></Contact>
                <Contact social={SOCIAL.whatsapp} input={whatsapp} ></Contact>
                <Contact social={SOCIAL.instagram} input={instagram} ></Contact>                
                <Contact social={SOCIAL.telegram} input={telegram} ></Contact>
            </div>
            <button className='btn btn-lg' onClick={() => infoHandler()}>Завершити реєстрацію</button>
        </>}

        {currentPage === INFO_TITLE_SCREEN && <>
            <div className='title'>Назва вашої компанії (якщо немає, то ваше ім’я та прізвище)</div>
            <input className='input' placeholder='ввести' {...name.bind} />
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

        {/* <button onClick={load}>test</button> */}

        </div>
    );
}

export default InfoPage;
