import { useState } from "react";
import { ApolloError } from "@apollo/client";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CREATE_TOKEN_STATUS, isEmailNotVerifiedError } from "api/auth/signIn";
import LoginForm from "components/forms/LoginForm";
import RegistrationForm from "components/forms/RegistrationForm";
import TwoStepLoginForm from "components/forms/TwoStepLoginForm";
import { LoginFormError } from "components/forms/TwoStepLoginForm/types";
import GoogleAuthButton from "components/GoogleAuthButton";
import Greeter from "components/Greeter";
import MicrosoftSignInButton from "components/MicrosoftSignInButton";
import OAuthSignIn from "components/OAuthSignIn";
import Redirector from "components/Redirector";
import { getPasswordSignInErrorMessageId } from "containers/AuthorizationContainer/passwordSignInError";
import { initialize } from "containers/InitializeContainer/redux";
import { useCreateTokenMutation, useCreateUserMutation, useSignInMutation } from "graphql/__generated__/hooks/auth";
import { useCompleteSignIn } from "hooks/useCompleteSignIn";
import { useCreateToken } from "hooks/useCreateToken";
import { useGetToken } from "hooks/useGetToken";
import { useIsMfaLoginEnabled } from "hooks/useIsMfaLoginEnabled";
import { useStartLoginChallenge } from "hooks/useLoginChallenge";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import VerifyEmailService from "services/VerifyEmailService";
import {
  REGISTER,
  LOGIN,
  INITIALIZE,
  EMAIL_VERIFICATION,
  SHOW_POLICY_QUERY_PARAM,
  USER_EMAIL_QUERY_PARAMETER_NAME,
  NEXT_QUERY_PARAMETER_NAME,
  OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME,
  getEmailVerificationUrl
} from "urls";
import { GA_EVENT_CATEGORIES, trackEvent } from "utils/analytics";
import { processGraphQLErrorData } from "utils/apollo";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import { ERROR_CODES } from "utils/errorCodes";
import { SPACING_4 } from "utils/layouts";
import macaroon from "utils/macaroons";
import { stringifySearchParams, getSearchParams } from "utils/network";
import { consumeUtmParams } from "utils/utm";

const AuthorizationContainer = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { invited: queryInvited } = getSearchParams();

  const { isDemo } = useOrganizationInfo();

  const { token } = useGetToken();

  const navigate = useNavigate();

  const isTokenExists = Boolean(token);

  const { useSendEmailVerificationCode } = VerifyEmailService();

  const { onSend: sendEmailVerificationCode, isLoading: isSendEmailVerificationCodeLoading } = useSendEmailVerificationCode();

  const isMfaLoginEnabled = useIsMfaLoginEnabled();

  const [createToken, { loading: legacyLoginLoading }] = useCreateTokenMutation();

  const { onCreateToken, isLoading: mfaLoginLoading } = useCreateToken();

  const loginLoading = isMfaLoginEnabled ? mfaLoginLoading : legacyLoginLoading;

  const [loginError, setLoginError] = useState<LoginFormError | null>(null);

  const completeSignIn = useCompleteSignIn();

  const startLoginChallenge = useStartLoginChallenge();

  const [createUser, { loading: registerLoading }] = useCreateUserMutation();

  const [signIn, { loading: signInLoading }] = useSignInMutation();

  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await createToken({ variables: { email, password } });
      const caveats = macaroon.processCaveats(macaroon.deserialize(data.token.token).getCaveats());
      dispatch(initialize({ ...data.token, caveats }));
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorsData = error.graphQLErrors.map(processGraphQLErrorData);
        if (errorsData.some(({ errorCode }) => errorCode === ERROR_CODES.OA0073)) {
          navigate(`${EMAIL_VERIFICATION}?${stringifySearchParams({ email })}`);
        }
      }
    }
  };

  const handleMfaLogin = async ({ email, password }: { email: string; password: string }) => {
    setLoginError(null);

    try {
      const { status, data } = await onCreateToken({ email, password });

      if (status === CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED) {
        startLoginChallenge(data);
        return;
      }

      completeSignIn(data);
    } catch (error) {
      if (isEmailNotVerifiedError(error)) {
        navigate(getEmailVerificationUrl(email));
        return;
      }

      // Anything else keeps the visitor on the password step with a retryable message.
      setLoginError({ messageId: getPasswordSignInErrorMessageId(error) });
    }
  };

  const handleRegister = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const { data } = await consumeUtmParams((utm) => createUser({ variables: { email, password, name, utm } }));

    trackEvent({ category: GA_EVENT_CATEGORIES.USER, action: "Registered", label: "optscale" });

    if (data.user.verified) {
      const caveats = macaroon.processCaveats(macaroon.deserialize(data.user.token).getCaveats());
      return dispatch(initialize({ ...data.user, caveats }));
    }

    const { [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability } = getSearchParams() as {
      [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: string;
    };

    await sendEmailVerificationCode(email, {
      [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: Object.values(OPTSCALE_CAPABILITY).includes(capability)
        ? capability
        : undefined
    });

    return navigate(
      `${EMAIL_VERIFICATION}?${stringifySearchParams({
        email,
        [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability
      })}`
    );
  };

  const handleThirdPartySignIn = async ({ provider, token: thirdPartyToken, tenantId, redirectUri }) => {
    const { data, caveats } = await consumeUtmParams(
      async (utm) => {
        const { data: signInData } = await signIn({
          variables: { provider, token: thirdPartyToken, tenantId, redirectUri, utm },
        });
        const signInToken = signInData?.signIn?.token;
        return {
          data: signInData,
          caveats: signInToken ? macaroon.processCaveats(macaroon.deserialize(signInToken).getCaveats()) : {},
        };
      },
      // Attribution is consumed by a registration; a plain sign-in must keep the stored
      // set available for a future registration attempt.
      { shouldClear: ({ caveats: signInCaveats }) => Boolean(signInCaveats.register) }
    );

    if (caveats.register) {
      trackEvent({ category: GA_EVENT_CATEGORIES.USER, action: "Registered", label: caveats.provider });
    }
    if (data?.signIn?.token) {
      dispatch(initialize({ ...data.signIn, caveats }));
    }
  };

  const isInvited = queryInvited !== undefined;

  const createForm =
    {
      [LOGIN]: () =>
        isMfaLoginEnabled ? (
          <TwoStepLoginForm
            onSubmit={handleMfaLogin}
            isLoading={loginLoading}
            disabled={registerLoading || signInLoading}
            isInvited={isInvited}
            error={loginError}
          />
        ) : (
          <LoginForm
            onSubmit={handleLogin}
            isLoading={loginLoading}
            disabled={registerLoading || signInLoading}
            isInvited={isInvited}
          />
        ),
      [REGISTER]: () => (
        <RegistrationForm
          onSubmit={handleRegister}
          isLoading={registerLoading}
          disabled={loginLoading || signInLoading || isSendEmailVerificationCodeLoading}
          isInvited={isInvited}
        />
      )
    }[pathname] || (() => null);

  // TODO: get back to the force redirect
  // redirecting already authorized user from /login and /register pages
  // const shouldRedirectAuthorizedUser = !isAuthInProgress && !isRegistrationInProgress && !isDemo && isTokenExists;
  const shouldRedirectAuthorizedUser = !isDemo && isTokenExists;

  const getRedirectionPath = () => {
    const {
      [NEXT_QUERY_PARAMETER_NAME]: next,
      [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability,
      [USER_EMAIL_QUERY_PARAMETER_NAME]: email,
      [SHOW_POLICY_QUERY_PARAM]: showPolicy
    } = getSearchParams() as {
      [NEXT_QUERY_PARAMETER_NAME]: string;
      [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: string;
      [USER_EMAIL_QUERY_PARAMETER_NAME]: string;
      [SHOW_POLICY_QUERY_PARAM]: boolean | string;
    };

    return `${INITIALIZE}?${stringifySearchParams({
      [NEXT_QUERY_PARAMETER_NAME]: next,
      [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability,
      [USER_EMAIL_QUERY_PARAMETER_NAME]: email,
      [SHOW_POLICY_QUERY_PARAM]: showPolicy
    })}`;
  };

  return (
    <Redirector condition={shouldRedirectAuthorizedUser} to={getRedirectionPath()}>
      <Greeter
        content={
          <Stack spacing={SPACING_4}>
            <div>{createForm()}</div>
            <div>
              <OAuthSignIn
                googleButton={
                  <GoogleAuthButton
                    handleSignIn={handleThirdPartySignIn}
                    isLoading={signInLoading}
                    disabled={loginLoading || registerLoading}
                  />
                }
                microsoftButton={
                  <MicrosoftSignInButton
                    handleSignIn={handleThirdPartySignIn}
                    isLoading={signInLoading}
                    disabled={loginLoading || registerLoading}
                  />
                }
              />
            </div>
          </Stack>
        }
      />
    </Redirector>
  );
};

export default AuthorizationContainer;
