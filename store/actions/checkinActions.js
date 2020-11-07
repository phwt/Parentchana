import * as types from "./actionTypes";

export const loadCheckinList = (checkinItems) => {
  return { type: types.LOAD_CHECKIN_LIST, checkinItems };
};
