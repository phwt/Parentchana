import * as types from "./actionTypes";

export const loadPickupList = (students) => {
  return { type: types.LOAD_PICKUP_LIST, students };
};
