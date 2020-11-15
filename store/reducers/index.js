import { combineReducers } from "redux";
import pickup from "./pickupReducer";
import calendar from "./calendarReducer";
import checkin from "./checkinReducer";
import auth from "./authReducer";
import profile from "./profileReducer";

const rootReducer = combineReducers({
  pickup,
  calendar,
  checkin,
  auth,
  profile,
});

export default rootReducer;
