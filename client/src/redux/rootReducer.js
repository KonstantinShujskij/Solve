import { combineReducers } from "redux"
import userReducer from "./userRuducer"
import appReducer from "./appReducer"
import devicesReducer from "./devicesReducer"
import alertReducer from "./alertReducer"
import filterReducer from "./filterReducer"


const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    devices: devicesReducer,
    alert: alertReducer,
    filter: filterReducer,
})

export default rootReducer