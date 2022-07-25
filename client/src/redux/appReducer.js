import { LOGIN, LOGOUT, SET_CAT, SET_CONTRACT, SET_CURRENT_DEVICE } from "./types";

const initialState = {
    token: null,
    userId: null,
    selectDevice: null,
    contract: null,
    static: {
      categories: []
    }
}

export default function appReducer(state=initialState, action) {
  switch(action.type) {
      case LOGIN:
        return {...state, ...action.payload}
      case LOGOUT:
        return {...initialState}
      case SET_CAT:
        return {...state, static: { ...state.static, categories: action.payload }}
      case SET_CURRENT_DEVICE:
        return {...state, selectDevice: {...action.payload}}
      default:
        return state
  }
}