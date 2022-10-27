import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DOWNWARD, UPWARD } from '../const'
import useFilter from '../hooks/filter.hook'
import * as selectors from "../selectors"


function WorkFilterSection() {
    const categories = useSelector(selectors.categories)
    const ordersFilter = useSelector(selectors.ordersFilter)

    const { toggleOrderCases, toggleOrderStatus, sortOrderDate } = useFilter()


    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Фільтрувати</h2>
            </div>

            <div className='list'>
                <div className='card filter-card'>
                    <div className='separator'>
                        <div className='separator__hr'></div>
                        <span className='separator__text text'>За Статусом</span>
                        <div className='separator__hr'></div>
                    </div>
                    <div className='filter__item' onClick={() => toggleOrderStatus('RESERVE')}>
                        <div className='text'>Очікую</div>
                        <div className={`filter__point ${ordersFilter.status.includes('RESERVE')? 'filter__point_active' : null}`}></div>
                    </div>
                    <div className='filter__item' onClick={() => toggleOrderStatus('PACT')}>
                        <div className='text'>Ремонтую</div>
                        <div className={`filter__point ${ordersFilter.status.includes('PACT')? 'filter__point_active' : null}`}></div>
                    </div>
                    <div className='filter__item' onClick={() => toggleOrderStatus('CONFIRM')}>
                        <div className='text'>Готово</div>
                        <div className={`filter__point ${ordersFilter.status.includes('CONFIRM')? 'filter__point_active' : null}`}></div>
                    </div>

                    <div className='separator'>
                        <div className='separator__hr'></div>
                        <span className='separator__text text'>За Категоріями</span>
                        <div className='separator__hr'></div>
                    </div>
                    {categories.map((item, index) => 
                        <div className='filter__item' key={index} onClick={() => toggleOrderCases(item)}>
                            <div className='text'>{item}</div>
                            <div className={`filter__point ${ordersFilter.cases.includes(item)? 'filter__point_active' : null}`}></div>
                        </div>
                    )}

                    <div className='separator'>
                        <div className='separator__hr'></div>
                        <span className='separator__text text'>За Часом</span>
                        <div className='separator__hr'></div>
                    </div>
                    <div className='filter__item' onClick={() => sortOrderDate(DOWNWARD)}>
                        <div className='text'>Спочатку нові</div>
                        <div className={`filter__point ${ordersFilter.date === DOWNWARD? 'filter__point_active' : null}`}></div>
                    </div>
                    <div className='filter__item' onClick={() => sortOrderDate(UPWARD)}>
                        <div className='text'>Спочатку старі</div>
                        <div className={`filter__point ${ordersFilter.date === UPWARD? 'filter__point_active' : null}`}></div>
                    </div>
                </div>
            </div>

            <div className='content mt-auto'>
                <Link className='w-100 button' to="/work-list">Відфільтрувати</Link>
            </div>
        </>
    )
}

export default WorkFilterSection
