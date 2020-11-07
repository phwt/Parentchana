import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const pickupReducer = (state = initialState.pickup, action) => {
  switch (action.type) {
    case types.LOAD_PICKUP_LIST:
      return state;
    case types.CREATE_PICKUP_ITEM:
      return { ...state, list: [...state.list, action.student] };
    case types.LOAD_REGISTERED_STUDENT:
      return state;
    case types.REGISTER_NEW_STUDENT:
      return {
        ...state,
        registeredStudent: [...state.registeredStudent, action.student],
      };
    case types.DEREGISTER_STUDENT:
      return {
        ...state,
        registeredStudent: state.registeredStudent.filter(
          (student) => student !== action.student
        ),
      };
    default:
      return state;
  }
};

export default pickupReducer;
