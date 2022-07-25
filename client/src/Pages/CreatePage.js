import React from 'react'

import { useNavigate } from "react-router-dom"
import SelectSingle from '../components/SelectSingle'
import useValidationInput from '../hooks/input.hook'
import useSelectSingle from '../hooks/selectSingle.hook'
import useApi from '../hooks/api.hook'
import useFileLoad from '../hooks/fileLoad.hook'
import FileLoader from '../components/FileLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGavel, faMagnifyingGlass, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import * as selectors from '../selectors'
import Input from '../components/base/Input'

function CreatePage() {
    const navigate = useNavigate()
    const { createDevice } = useApi()

    const categories = useSelector(selectors.categories)

    const category = useSelectSingle(categories)
    const model = useValidationInput('')
    const description = useValidationInput('')
    const images = useFileLoad({ multi: true, accept: ['.png', '.jpg', '.jpeg'] })

    const createHandler = async () => {
        const form = new FormData()
        form.append('category', category.value)
        form.append('model', model.value)
        form.append('description', description.value)
        images.list.forEach((item) => form.append('images', item.file))

        if(await createDevice(form)) { navigate('/') }
    }

    return (
        <div className="auth">
            <button className='back-btn' onClick={() => navigate('/')}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
            <SelectSingle {...category.bind}></SelectSingle>
            <Input input={model.bind} label="Модель пристрою"></Input>
            <br />
            <textarea className='input' {...description.bind} placeholder='Опишіть проблему'></textarea>
            <div>
                <h4>Фото. Бажано, якщо можете</h4>
                <FileLoader {...images.bind}></FileLoader>
            </div>
            <div className='btns'>
                <button className='btn' onClick={() => createHandler()}>
                    <FontAwesomeIcon icon={faGavel} />
                </button>
                <button className='btn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    );
}

export default CreatePage;
