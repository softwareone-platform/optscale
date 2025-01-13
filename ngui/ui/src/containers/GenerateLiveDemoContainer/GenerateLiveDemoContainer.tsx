import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLiveDemo, createLiveDemo, RESTAPI } from "api";
import { GET_LIVE_DEMO, CREATE_LIVE_DEMO } from "api/restapi/actionTypes";
import GenerateLiveDemo from "components/GenerateLiveDemo";
import { initialize } from "containers/InitializeContainer/redux";
import { CREATE_TOKEN } from "graphql/api/auth/queries";
import { useApiState } from "hooks/useApiState";
import { reset } from "reducers/route";
import { HOME } from "urls";
import { isError } from "utils/api";
import macaroon from "utils/macaroons";
import { getQueryParams } from "utils/network";

type GenerateLiveDemoContainerProps = {
  email?: string;
  subscribeToNewsletter?: boolean;
};

const GenerateLiveDemoContainer = ({ email, subscribeToNewsletter }: GenerateLiveDemoContainerProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  const { isLoading: isGetLiveDemoLoading } = useApiState(GET_LIVE_DEMO);
  const { isLoading: isCreateLiveDemoLoading } = useApiState(CREATE_LIVE_DEMO);

  const [createToken, { loading: loginLoading }] = useMutation(CREATE_TOKEN, {
    onCompleted: (data) => {
      const caveats = macaroon.processCaveats(macaroon.deserialize(data.token.token).getCaveats());
      dispatch(initialize({ ...data.token, caveats }));
    }
  });

  useEffect(() => {
    const activeLiveDemo = (handlers) => (_, getState) => {
      dispatch(getLiveDemo())
        .then(() => {
          if (isError(GET_LIVE_DEMO, getState())) {
            return Promise.reject();
          }

          const isAlive = getState()?.[RESTAPI]?.[GET_LIVE_DEMO].is_alive ?? false;
          if (isAlive) {
            return Promise.reject(handlers.redirect);
          }
          // Clear the storage from "real" organization data and prevent from calling APIs with a "real" scope id.
          // This will not redirect users back to login, this page is allowed without a token.
          return dispatch(reset());
        })
        .then(() =>
          dispatch(
            createLiveDemo({
              email,
              subscribeToNewsletter
            })
          )
        )
        .then(() => {
          if (isError(CREATE_LIVE_DEMO, getState())) {
            return Promise.reject();
          }

          const generatedEmail = getState()?.[RESTAPI]?.[GET_LIVE_DEMO].email ?? "";
          const generatedPassword = getState()?.[RESTAPI]?.[GET_LIVE_DEMO].password ?? "";
          if (generatedEmail && generatedPassword) {
            return createToken({ variables: { email: generatedEmail, password: generatedPassword } });
          }

          return Promise.reject();
        })
        .then(() => {
          const { token } = getState()?.initial ?? {};

          if (token) {
            return Promise.reject(handlers.redirect);
          }

          return Promise.reject();
        })
        .catch((e) => (typeof e === "function" ? e() : setHasError(true)));
    };

    if (!hasError) {
      dispatch(
        activeLiveDemo({
          redirect: () => {
            const { next } = getQueryParams();
            navigate(next || HOME);
          }
        })
      );
    }
  }, [hasError, dispatch, navigate, email, subscribeToNewsletter, createToken]);

  return (
    <GenerateLiveDemo
      isLoading={loginLoading || isGetLiveDemoLoading || isCreateLiveDemoLoading}
      showRetry={hasError}
      retry={() => setHasError(false)}
    />
  );
};

export default GenerateLiveDemoContainer;
