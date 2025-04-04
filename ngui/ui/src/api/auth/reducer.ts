import macaroon from "utils/macaroons";
import { SET_ALLOWED_ACTIONS, SET_TOKEN, SET_USER } from "./actionTypes";

export const AUTH = "auth";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      const { token, user_id: userId, user_email: userEmail } = action.payload;

      const caveats = macaroon.processCaveats(macaroon.deserialize(token).getCaveats());

      return {
        ...state,
        [action.label]: {
          userId,
          userEmail,
          token,
          ...caveats
        }
      };
    }
    case SET_USER:
      return {
        ...state,
        [action.label]: {
          name: action.payload.display_name,
          email: action.payload.email
        }
      };
    case SET_ALLOWED_ACTIONS: {
      return {
        ...state,
        [action.label]: {
          allowedActions: {
            ...state[action.label]?.allowedActions,
            ...action.payload.allowed_actions
          }
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
