import * as types from "./actionTypes";
import {
  addRegisterPickupStudent,
  removeRegisterPickupStudent,
} from "../../modules/Firebase";

export const setProfile = (profile) => {
  return { type: types.SET_PROFILE, profile };
};

export const addPickupStudent = (studentId) => {
  return async (dispatch, getState) => {
    const { profile } = getState();
    await addRegisterPickupStudent(profile.uid, studentId);
    dispatch({ type: types.ADD_PICKUP_STUDENT, studentId });
  };
};

export const removePickupStudent = (studentId) => {
  return async (dispatch, getState) => {
    const { profile } = getState();
    await removeRegisterPickupStudent(profile.uid, studentId);
    dispatch({ type: types.REMOVE_PICKUP_STUDENT, studentId });
  };
};

export const changePickupPlate = (plateNo) => {
  return { type: types.CHANGE_PICKUP_PLATE, plateNo };
};
