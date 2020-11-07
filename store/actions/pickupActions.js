import * as types from "./actionTypes";

export const loadPickupList = (students) => {
  return { type: types.LOAD_PICKUP_LIST, students };
};

export const createPickupItem = (student) => {
  return { type: types.CREATE_PICKUP_ITEM, student };
};
