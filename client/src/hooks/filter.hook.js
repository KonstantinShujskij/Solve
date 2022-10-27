import { useDispatch, useSelector } from "react-redux"
import { setAuctionFilterBets, setAuctionFilterCases, setAuctionFilterDate, setOrderFilterCases, setOrderFilterDate, setOrderFilterStatus } from '../redux/actions'
import * as selectors from "../selectors"

const toggle = (list, item) => {
    const temp = [...list]
    const index = temp.indexOf(item)
    
    if(index === -1) { temp.push(item) }
    else { temp.splice(index, 1) }

    return temp
}

export default function useFilter() {
    const auctionFilter = useSelector(selectors.auctionFilter)
    const ordersFilter = useSelector(selectors.ordersFilter)

    const dispatch = useDispatch()

    const toggleAuctionCases = (item) => {
        dispatch(setAuctionFilterCases(toggle(auctionFilter.cases, item))) 
    }
    const sortAuctionDate = (sort) => dispatch(setAuctionFilterDate(sort))
    const sortAuctionBets = (sort) => dispatch(setAuctionFilterBets(sort))

    const toggleOrderCases = (item) => {
        dispatch(setOrderFilterCases(toggle(ordersFilter.cases, item))) 
    }
    const toggleOrderStatus = (item) => {
        dispatch(setOrderFilterStatus(toggle(ordersFilter.status, item)))
    }
    const sortOrderDate = (sort) => dispatch(setOrderFilterDate(sort))


    return { 
        toggleAuctionCases,
        sortAuctionDate,
        sortAuctionBets,

        toggleOrderCases,
        toggleOrderStatus,
        sortOrderDate,
    }
}