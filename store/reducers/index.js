import { combineReducers } from "redux";
import pickup from "./pickupReducer";
import calendar from "./calendarReducer";
import checkin from "./checkinReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
  pickup,
  calendar,
  checkin,
  auth,
});

export default rootReducer;
