import { combineReducers } from "redux";
import userReducer from "./userRuducer";
import appReducer from "./appReducer";
import devicesReducer from "./devicesReducer";


const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    devices: devicesReducer,
});

export default rootReducer;