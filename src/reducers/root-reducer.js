import { combineReducers } from "redux";

import calendar from "./calendar";
import events from "./events";

const rootReducer = combineReducers({
    calendar,
    events
})

export default rootReducer;