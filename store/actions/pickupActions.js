import * as types from "./actionTypes";

export const loadPickupList = (students) => {
  return { type: types.LOAD_PICKUP_LIST, students };
};

export const loadRegisteredStudent = (students) => {
  return { type: types.LOAD_REGISTERED_STUDENT, students };
};

export const registerNewStudent = (student) => {
  return { type: types.REGISTER_NEW_STUDENT, student };
};

export const deregisterStudent = (student) => {
  return { type: types.DEREGISTER_STUDENT, student };
};

export const registerPlate = (plate) => {
  return { type: types.REGISTER_PLATE, plate };
};

export const getRegisteredPlate = (plate) => {
  return { type: types.GET_REGISTERED_PLATE, plate };
};
