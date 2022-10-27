import { UPWARD } from "../const";
import { SET_AUCTION_FILTER_BETS, SET_AUCTION_FILTER_CASES, SET_AUCTION_FILTER_DATE, SET_ORDER_FILTER_CASES, SET_ORDER_FILTER_DATE, SET_ORDER_FILTER_STATUS } from "./types";

const initialState = {
    ordersFilter: {
        status: [],
        cases: [],
        date: UPWARD,
    },
    auctionFilter: {
        cases: [],
        date: UPWARD,
        bets: UPWARD,
    },
}

export default function filterReducer(state=initialState, action) {
  switch(action.type) {
      case SET_AUCTION_FILTER_CASES:
          return {...state, auctionFilter: {...state.auctionFilter, cases: action.payload}}
      case SET_AUCTION_FILTER_DATE:
          return {...state, auctionFilter: {...state.auctionFilter, date: action.payload}}
      case SET_AUCTION_FILTER_BETS:
          return {...state, auctionFilter: {...state.auctionFilter, bets: action.payload}}

      case SET_ORDER_FILTER_STATUS:
          return {...state, ordersFilter: {...state.ordersFilter, status: action.payload}}
      case SET_ORDER_FILTER_CASES:
          return {...state, ordersFilter: {...state.ordersFilter, cases: action.payload}}
      case SET_ORDER_FILTER_DATE:
          return {...state, ordersFilter: {...state.ordersFilter, date: action.payload}}

      default:
          return state
  }
}