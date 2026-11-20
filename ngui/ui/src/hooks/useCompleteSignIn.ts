import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AuthToken } from "api/auth/signIn";
import { initialize } from "containers/InitializeContainer/redux";
import macaroon from "utils/macaroons";

/** Stores an issued token the way the rest of the app expects — shared by every sign-in and registration path. */
export const useCompleteSignIn = () => {
  const dispatch = useDispatch();

  return useCallback(
    // `useGetToken` reads the user's id and address from the session too, so a bare token is not enough.
    (authToken: Pick<AuthToken, "token" | "user_id" | "user_email">) => {
      const caveats = macaroon.processCaveats(macaroon.deserialize(authToken.token).getCaveats());

      dispatch(initialize({ ...authToken, caveats }));
    },
    [dispatch]
  );
};
