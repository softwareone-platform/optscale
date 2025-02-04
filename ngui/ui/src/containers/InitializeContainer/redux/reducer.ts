import { INITIALIZE } from "./actionTypes";

export const INITIAL = "initial";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
