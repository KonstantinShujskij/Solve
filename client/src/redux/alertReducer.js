import { CLEAR_MESS, CLEAR_ERROR, SET_ERROR, SET_MESS } from "./types";

const initialState = {
    error: '',
    mess: ''
}

export default function alertReducer(state=initialState, action) {
  switch(action.type) {
      case SET_MESS:
        return {...state, mess: action.payload}
      case SET_ERROR:
        return {...state, error: action.payload}
      case CLEAR_MESS:
        return {...state, mess: ''}
      case CLEAR_ERROR:
        return {...state, error: ''}
      default:
        return state
  }
}