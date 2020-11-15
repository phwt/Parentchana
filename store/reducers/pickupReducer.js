import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const pickupReducer = (state = initialState.pickup, action) => {
  switch (action.type) {
    case types.ADD_STUDENT:
      return {
        ...state,
        registeredStudents: [...state.registeredStudents, action.studentId],
      };
    case types.REMOVE_STUDENT:
      return {
        ...state,
        registeredStudents: state.registeredStudents.filter(
          (studentId) => studentId !== action.studentId
        ),
      };
    case types.CHANGE_PLATE:
      return { ...state, registeredPlate: action.plateNo };
    default:
      return state;
  }
};

export default pickupReducer;
