import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AuthToken } from "@theme/api/auth/signIn";
import { initialize } from "containers/InitializeContainer/redux";
import macaroon from "utils/macaroons";

/** Stores an issued token the way the rest of the app expects — shared by every sign-in and registration path. */
export const useCompleteSignIn = () => {
  const dispatch = useDispatch();

  return useCallback(
    (authToken: Pick<AuthToken, "token">) => {
      const caveats = macaroon.processCaveats(macaroon.deserialize(authToken.token).getCaveats());

      dispatch(initialize({ ...authToken, caveats }));
    },
    [dispatch]
  );
};
