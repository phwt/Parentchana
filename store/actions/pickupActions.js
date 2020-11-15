import * as types from "./actionTypes";

export const addStudent = (studentId) => {
  return { type: types.ADD_STUDENT, studentId };
};

export const removeStudent = (studentId) => {
  return { type: types.REMOVE_STUDENT, studentId };
};

export const changePlate = (plateNo) => {
  return { type: types.CHANGE_PLATE, plateNo };
};
