import * as types from "../actions/actionTypes";

const pickupReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_PICKUP_LIST:
      return state;
    default:
      return state;
  }
};

export default pickupReducer
