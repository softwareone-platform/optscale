import { useState } from "react";
import { ApolloError } from "@apollo/client";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AuthToken,
  CREATE_TOKEN_STATUS,
  isEmailNotVerifiedError,
  isInvalidCredentialsError,
  LOGIN_CHALLENGE_STATE
} from "@theme/api/auth/signIn";
import TwoStepLoginForm from "@theme/components/forms/TwoStepLoginForm";
import { LoginFormError } from "@theme/components/forms/TwoStepLoginForm/types";
import { useCreateToken } from "@theme/hooks/useCreateToken";
import { useIsFeatureEnabled } from "@theme/hooks/useIsFeatureEnabled";
import { MFA_CHALLENGE, MFA_ENROLLMENT } from "@theme/urls";
import LoginForm from "components/forms/LoginForm";
import RegistrationForm from "components/forms/RegistrationForm";
import Greeter from "components/Greeter";
import Redirector from "components/Redirector";
import { initialize } from "containers/InitializeContainer/redux";
import { useCreateTokenMutation, useCreateUserMutation } from "graphql/__generated__/hooks/auth";
import { useGetToken } from "hooks/useGetToken";
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
  OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME
} from "urls";
import { GA_EVENT_CATEGORIES, trackEvent } from "utils/analytics";
import { processGraphQLErrorData } from "utils/apollo";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import { ERROR_CODES } from "utils/errorCodes";
import { SPACING_4 } from "utils/layouts";
import macaroon from "utils/macaroons";
import { stringifySearchParams, getSearchParams } from "utils/network";

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

  // Flip `mfa_login` in theme.features.ts to exercise the two-step login against the mocked
  // transport; with the flag off the original single-step login runs untouched.
  const isMfaLoginEnabled = useIsFeatureEnabled("mfa_login");

  const [createToken, { loading: legacyLoginLoading }] = useCreateTokenMutation();

  const { onCreateToken, isLoading: mfaLoginLoading } = useCreateToken();

  const loginLoading = isMfaLoginEnabled ? mfaLoginLoading : legacyLoginLoading;

  const [loginError, setLoginError] = useState<LoginFormError | null>(null);

  const [createUser, { loading: registerLoading }] = useCreateUserMutation();

  const completeSignIn = (authToken: AuthToken) => {
    const caveats = macaroon.processCaveats(macaroon.deserialize(authToken.token).getCaveats());

    dispatch(initialize({ ...authToken, caveats }));
  };

  const handleLegacyLogin = async ({ email, password }: { email: string; password: string }) => {
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
        const challengeUrl = data.state === LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED ? MFA_ENROLLMENT : MFA_CHALLENGE;

        navigate(challengeUrl, { state: { challenge: data } });
        return;
      }

      completeSignIn(data);
    } catch (error) {
      if (isEmailNotVerifiedError(error)) {
        navigate(`${EMAIL_VERIFICATION}?${stringifySearchParams({ email })}`);
        return;
      }

      // Anything else keeps the visitor on the password step with a retryable message.
      setLoginError({
        messageId: isInvalidCredentialsError(error) ? "signIn:invalidCredentials" : "somethingWentWrong"
      });
    }
  };

  const handleRegister = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const { data } = await createUser({ variables: { email, password, name } });

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

  const isInvited = queryInvited !== undefined;

  const createForm =
    {
      [LOGIN]: () =>
        isMfaLoginEnabled ? (
          <TwoStepLoginForm
            onSubmit={handleMfaLogin}
            isLoading={loginLoading}
            disabled={registerLoading}
            isInvited={isInvited}
            error={loginError}
          />
        ) : (
          <LoginForm onSubmit={handleLegacyLogin} isLoading={loginLoading} disabled={registerLoading} isInvited={isInvited} />
        ),
      [REGISTER]: () => (
        <RegistrationForm
          onSubmit={handleRegister}
          isLoading={registerLoading}
          disabled={loginLoading || isSendEmailVerificationCodeLoading}
          isInvited={isInvited}
        />
      )
    }[pathname] || (() => null);

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
          </Stack>
        }
      />
    </Redirector>
  );
};

export default AuthorizationContainer;
