import * as types from "../actions/actionTypes";
import initialState from "../initialState";

const pickupReducer = (state = initialState.pickup, action) => {
  switch (action.type) {
    case types.LOAD_PICKUP_LIST:
      return state;
    case types.CREATE_PICKUP_ITEM:
      return { ...state, list: [...state.list, action.student] };
    default:
      return state;
  }
};

export default pickupReducer;
