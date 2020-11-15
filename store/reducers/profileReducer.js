import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const profileReducer = (state = initialState.profile, action) => {
  switch (action.type) {
    case types.SET_PROFILE:
      return action.profile;
    case types.ADD_PICKUP_STUDENT:
      return {
        ...state,
        pickupStudents: [...state.pickupStudents, action.studentId],
      };
    case types.REMOVE_PICKUP_STUDENT:
      console.log(state);
      console.log({
        ...state,
        pickupStudents: state.pickupStudents.filter(
          (studentId) => studentId !== action.studentId
        ),
      });
      return {
        ...state,
        pickupStudents: state.pickupStudents.filter(
          (studentId) => studentId !== action.studentId
        ),
      };
    case types.CHANGE_PICKUP_PLATE:
      return { ...state, pickupPlate: action.plateNo };
    default:
      return state;
  }
};

export default profileReducer;
