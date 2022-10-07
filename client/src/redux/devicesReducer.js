import { PUSH_DEVICE, REMOVE_DEVICES } from "./types";

const initialState = {}

export default function devicesReducer(state=initialState, action) {
  switch(action.type) {
      case PUSH_DEVICE:
        const temp = {...state}
        temp[action.payload._id] = action.payload
        return {...temp}
      case REMOVE_DEVICES:
        return {}
      default:
        return state
  }
}