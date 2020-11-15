import * as types from "./actionTypes";

export const setProfile = (profile) => {
  return { type: types.SET_PROFILE, profile };
};

export const addPickupStudent = (studentId) => {
  return { type: types.ADD_PICKUP_STUDENT, studentId };
};

export const removePickupStudent = (studentId) => {
  return { type: types.REMOVE_PICKUP_STUDENT, studentId };
};

export const changePickupPlate = (plateNo) => {
  return { type: types.CHANGE_PICKUP_PLATE, plateNo };
};
