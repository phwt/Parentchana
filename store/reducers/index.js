import { combineReducers } from "redux";
import pickup from "./pickupReducer";

const rootReducer = combineReducers({
  pickup,
});

export default rootReducer;
