import React from 'react'

import { useNavigate } from "react-router-dom"
import Select from '../components/base/Select'
import useValidationInput from '../hooks/input.hook'
import useSelect from '../hooks/select.hook'
import useApi from '../hooks/api.hook'
import useFileLoad from '../hooks/fileLoad.hook'
import FileLoader from '../components/FileLoader'
import { useSelector } from 'react-redux'
import * as selectors from '../selectors'
import Input from '../components/base/Input'
import { ICONS } from '../const'

function CreatePage() {
    const navigate = useNavigate()
    const { createDevice } = useApi()

    const categories = useSelector(selectors.categories)

    const category = useSelect(categories, false)
    const model = useValidationInput('')
    const description = useValidationInput('')
    const images = useFileLoad({ multi: true, accept: ['.png', '.jpg', '.jpeg'] })

    const createHandler = async () => {
        const form = new FormData()
        form.append('category', category.cases)
        form.append('model', model.value)
        form.append('description', description.value)
        images.list.forEach((item) => form.append('images', item.file))

        if(await createDevice(form)) { navigate('/') }
    }

    return (
        <div className="container">
            <div className='header'>
                <button className='back-btn' onClick={() => navigate(-1)}>
                    <span className='icon'>{ICONS.back}</span>
                </button>
            </div>

            <div className='content'>
                <h2 className='title content__title'>Новий пристрій</h2>
            </div>

            <div className='card'>
                <Select {...category.bind}></Select>
                <div className="card__space"></div>
                <Input input={model.bind} label="Модель пристрою"></Input>
                <div className="card__space"></div>
                <textarea className='input textarea' {...description.bind} placeholder='Опишіть проблему'></textarea>
                <div className="card__space"></div>
                <div className='text w-100'>Фото. Бажано, якщо можете</div>
                <FileLoader {...images.bind}></FileLoader>

                <button className='button w-100 card__button' onClick={() => createHandler()}>Створити аукціон</button>
                <button className='button w-100 card__button red' onClick={() => navigate('/search') }>Шукати виконавця самостійно</button>
            </div>



        </div>
    );
}

export default CreatePage;
