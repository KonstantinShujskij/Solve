import { combineReducers } from "redux"
import userReducer from "./userRuducer"
import appReducer from "./appReducer"
import devicesReducer from "./devicesReducer"
import alertReducer from "./alertReducer"



const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    devices: devicesReducer,
    alert: alertReducer
})

export default rootReducer