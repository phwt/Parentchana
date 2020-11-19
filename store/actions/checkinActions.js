import * as types from "./actionTypes";
import { fetchCheckinList as fetchCheckinListFirebase } from "../../modules/Firebase";

export const fetchCheckinList = (studentId) => {
  return async (dispatch) => {
    const checkinItems = await fetchCheckinListFirebase(studentId);
    dispatch({ type: types.FETCH_CHECKIN_LIST, checkinItems });
  };
};
