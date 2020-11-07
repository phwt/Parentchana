import { combineReducers } from "redux";
import pickup from "./pickupReducer";
import calendar from "./calendarReducer";
import checkin from "./checkinReducer";

const rootReducer = combineReducers({
  pickup,
  calendar,
  checkin,
});

export default rootReducer;
