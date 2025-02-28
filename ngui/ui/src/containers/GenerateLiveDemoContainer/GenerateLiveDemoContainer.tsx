import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLiveDemo, createLiveDemo, RESTAPI } from "api";
import { GET_LIVE_DEMO, CREATE_LIVE_DEMO } from "api/restapi/actionTypes";
import GenerateLiveDemo from "components/GenerateLiveDemo";
import { initialize } from "containers/InitializeContainer/redux";
import { CREATE_TOKEN } from "graphql/api/auth/queries";
import { UPDATE_OPTSCALE_CAPABILITY } from "graphql/api/restapi/queries";
import { reset } from "reducers/route";
import { HOME, NEXT_QUERY_PARAMETER_NAME, OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME } from "urls";
import { isError } from "utils/api";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import macaroon from "utils/macaroons";
import { getQueryParams } from "utils/network";
import { ObjectValues } from "utils/types";

type GenerateLiveDemoContainerProps = {
  email?: string;
  subscribeToNewsletter?: boolean;
};

const GenerateLiveDemoContainer = ({ email, subscribeToNewsletter }: GenerateLiveDemoContainerProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [generatedOrganizationId, setGeneratedOrganizationId] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const [createToken, { loading: loginLoading }] = useMutation(CREATE_TOKEN, {
    onCompleted: (data) => {
      const caveats = macaroon.processCaveats(macaroon.deserialize(data.token.token).getCaveats());
      dispatch(initialize({ ...data.token, caveats }));
    }
  });

  const [updateOptscaleCapabilityMutation] = useMutation(UPDATE_OPTSCALE_CAPABILITY);

  const redirectToOptscale = useCallback(() => {
    const { [NEXT_QUERY_PARAMETER_NAME]: next } = getQueryParams() as {
      [NEXT_QUERY_PARAMETER_NAME]: string;
    };
    navigate(next || HOME);
  }, [navigate]);

  useEffect(() => {
    const activeLiveDemo = (_, getState) => {
      setIsLoading(true);
      dispatch(getLiveDemo())
        .then(() => {
          if (isError(GET_LIVE_DEMO, getState())) {
            return Promise.reject();
          }

          const isAlive = getState()?.[RESTAPI]?.[GET_LIVE_DEMO].is_alive ?? false;
          if (isAlive) {
            return Promise.reject(() => {
              redirectToOptscale();
            });
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
          const organizationId = getState()?.[RESTAPI]?.[GET_LIVE_DEMO].organization_id;

          const { [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability } = getQueryParams() as {
            [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: ObjectValues<typeof OPTSCALE_CAPABILITY>;
          };

          if (Object.values(OPTSCALE_CAPABILITY).includes(capability)) {
            return updateOptscaleCapabilityMutation({
              variables: {
                organizationId,
                value: {
                  ...Object.fromEntries(Object.values(OPTSCALE_CAPABILITY).map((capability) => [capability, false])),
                  [capability]: true
                }
              }
            })
              .then(() =>
                Promise.reject(() => {
                  redirectToOptscale();
                })
              )
              .catch((e) => Promise.reject(e));
          } else {
            return Promise.resolve();
          }
        })
        .then(() => {
          const { token } = getState()?.initial ?? {};

          if (token) {
            const organizationId = getState()?.[RESTAPI]?.[GET_LIVE_DEMO].organization_id;

            return Promise.reject(() => setGeneratedOrganizationId(organizationId));
          }

          return Promise.reject();
        })
        .catch((e) => (typeof e === "function" ? e() : setHasError(true)))
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (!hasError) {
      dispatch(activeLiveDemo);
    }
  }, [createToken, dispatch, email, hasError, redirectToOptscale, subscribeToNewsletter, updateOptscaleCapabilityMutation]);

  return (
    <GenerateLiveDemo
      isLoading={loginLoading || isLoading}
      showRetry={hasError}
      organizationId={generatedOrganizationId}
      retry={() => {
        // Reset the state to clear all existing data, including the token.
        dispatch(reset());
        setGeneratedOrganizationId(undefined);
        setHasError(false);
      }}
      onSetupCapabilitySuccess={redirectToOptscale}
      onSetupCapabilityError={() => {
        setGeneratedOrganizationId(undefined);
        setHasError(true);
      }}
    />
  );
};

export default GenerateLiveDemoContainer;
