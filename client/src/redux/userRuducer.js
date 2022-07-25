import { REMOVE_USER, SET_USER } from "./types"

const initialState = {}

export default function userReducer(state=initialState, action) {
  switch(action.type) {
      case SET_USER:
        return {...action.payload}
      case REMOVE_USER:
        return {...initialState}
      default:
        return state
  }
}