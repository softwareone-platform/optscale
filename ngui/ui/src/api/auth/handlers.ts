import { GET_TOKEN, SET_TOKEN } from "./actionTypes";

export const onSuccessGetToken =
  ({ isTokenTemporary }) =>
  (data) => ({
    type: SET_TOKEN,
    payload: {
      ...data,
      isTokenTemporary
    },
    label: GET_TOKEN
  });

export const onSuccessSignIn = (data) => ({
  type: SET_TOKEN,
  payload: data,
  label: GET_TOKEN
});
