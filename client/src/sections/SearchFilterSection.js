import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DOWNWARD, UPWARD } from '../const'
import useFilter from '../hooks/filter.hook'
import * as selectors from "../selectors"


function SearchFilterSection() {
    const categories = useSelector(selectors.categories)
    const auctionFilter = useSelector(selectors.auctionFilter)

    const { toggleAuctionCases, sortAuctionDate, sortAuctionBets } = useFilter()

    return (
        <>
            <div className='content'>
                <h2 className='title content__title'>Фільтрувати</h2>
            </div>

            <div className='list'>
                <div className='card filter-card'>
                    <div className='separator'>
                        <div className='separator__hr'></div>
                        <span className='separator__text text'>За Категоріями</span>
                        <div className='separator__hr'></div>
                    </div>
                    {categories.map((item, index) => 
                        <div className='filter__item' key={index} onClick={() => toggleAuctionCases(item)}>
                            <div className='text'>{item}</div>
                            <div className={`filter__point ${auctionFilter.cases.includes(item)? 'filter__point_active' : null}`}></div>
                        </div>
                    )}

                    <div className='separator'>
                        <div className='separator__hr'></div>
                        <span className='separator__text text'>За Часом</span>
                        <div className='separator__hr'></div>
                    </div>
                    <div className='filter__item' onClick={() => sortAuctionDate(DOWNWARD)}>
                        <div className='text'>Спочатку нові</div>
                        <div className={`filter__point ${auctionFilter.date === DOWNWARD? 'filter__point_active' : null}`}></div>
                    </div>
                    <div className='filter__item' onClick={() => sortAuctionDate(UPWARD)}>
                        <div className='text'>Спочатку старі</div>
                        <div className={`filter__point ${auctionFilter.date === UPWARD? 'filter__point_active' : null}`}></div>
                    </div>

                    <div className='separator'>
                        <div className='separator__hr'></div>
                        <span className='separator__text text'>За Учасниками</span>
                        <div className='separator__hr'></div>
                    </div>
                    <div className='filter__item' onClick={() => sortAuctionBets(DOWNWARD)}>
                        <div className='text'>Спочатку більше</div>
                        <div className={`filter__point ${auctionFilter.bets === DOWNWARD? 'filter__point_active' : null}`}></div>
                    </div>
                    <div className='filter__item' onClick={() => sortAuctionDate(UPWARD)}>
                        <div className='text'>Спочатку менше</div>
                        <div className={`filter__point ${auctionFilter.bets === UPWARD? 'filter__point_active' : null}`}></div>
                    </div>
                </div>
            </div>

            <div className='content mt-auto'>
                <Link className='w-100 button' to="/search-list">Відфільтрувати</Link>
            </div>
        </>
    )
}

export default SearchFilterSection
