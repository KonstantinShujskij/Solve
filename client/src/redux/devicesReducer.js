import { REMOVE_DEVICES, SET_DEVICES } from "./types";

const initialState = []

export default function devicesReducer(state=initialState, action) {
  switch(action.type) {
      case SET_DEVICES:
        return [...action.payload]
      case REMOVE_DEVICES:
        return initialState
      default:
        return state
  }
}