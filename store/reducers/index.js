import { combineReducers } from "redux";
import pickup from "./pickupReducer";
import calendar from "./calendarReducer";

const rootReducer = combineReducers({
  pickup,
  calendar,
});

export default rootReducer;
