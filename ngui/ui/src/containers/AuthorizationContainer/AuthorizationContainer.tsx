import { useMutation } from "@apollo/client";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "components/forms/LoginForm";
import RegistrationForm from "components/forms/RegistrationForm";
import Greeter from "components/Greeter";
import Redirector from "components/Redirector";
import { initialize } from "containers/InitializeContainer/redux";
import { CREATE_TOKEN, CREATE_USER, SIGN_IN } from "graphql/api/auth/queries";
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
  OPTSCALE_MODE_QUERY_PARAMETER_NAME
} from "urls";
import { GA_EVENT_CATEGORIES, trackEvent } from "utils/analytics";
import { SPACING_4 } from "utils/layouts";
import macaroon from "utils/macaroons";
import { formQueryString, getQueryParams } from "utils/network";

const EMAIL_NOT_VERIFIED_ERROR_CODE = "OA0073";

const AuthorizationContainer = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { invited: queryInvited } = getQueryParams();

  const { isDemo } = useOrganizationInfo();

  const { token } = useGetToken();

  const navigate = useNavigate();

  const isTokenExists = Boolean(token);

  const { useSendEmailVerificationCode } = VerifyEmailService();

  const { onSend: sendEmailVerificationCode, isLoading: isSendEmailVerificationCodeLoading } = useSendEmailVerificationCode();

  const [createToken, { loading: loginLoading }] = useMutation(CREATE_TOKEN);

  const [createUser, { loading: registerLoading }] = useMutation(CREATE_USER);

<<<<<<< HEAD
  const [, { loading: signInLoading }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      const caveats = macaroon.processCaveats(macaroon.deserialize(data.signIn.token).getCaveats());
      const { register, provider } = caveats;
      if (register) {
        trackEvent({ category: GA_EVENT_CATEGORIES.USER, action: "Registered", label: provider });
        updateQueryParams({
          [SHOW_POLICY_QUERY_PARAM]: true
        });
=======
  const [signIn, { loading: signInLoading }] = useMutation(SIGN_IN);

  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await createToken({ variables: { email, password } });
      const caveats = macaroon.processCaveats(macaroon.deserialize(data.token.token).getCaveats());
      dispatch(initialize({ ...data.token, caveats }));
    } catch (error) {
      if (error?.graphQLErrors?.[0].extensions.response.body.error.error_code === EMAIL_NOT_VERIFIED_ERROR_CODE) {
        navigate(`${EMAIL_VERIFICATION}?${formQueryString({ email })}`);
>>>>>>> upstream/integration
      }
    }
  };

  const handleRegister = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const { data } = await createUser({ variables: { email, password, name } });

    trackEvent({ category: GA_EVENT_CATEGORIES.USER, action: "Registered", label: "optscale" });

    if (data.user.verified) {
      const caveats = macaroon.processCaveats(macaroon.deserialize(data.user.token).getCaveats());
      return dispatch(initialize({ ...data.user, caveats }));
    }

    await sendEmailVerificationCode(email);

    const { [OPTSCALE_MODE_QUERY_PARAMETER_NAME]: mode } = getQueryParams() as {
      [OPTSCALE_MODE_QUERY_PARAMETER_NAME]: string;
    };

    return navigate(
      `${EMAIL_VERIFICATION}?${formQueryString({
        email,
        mode
      })}`
    );
  };

<<<<<<< HEAD
  // const handleThirdPartySignIn = ({ provider, token: thirdPartyToken, tenantId, redirectUri }) => {
  //   signIn({ variables: { provider, token: thirdPartyToken, tenantId, redirectUri } }).then(({ data }) => {
  //     const caveats = macaroon.processCaveats(macaroon.deserialize(data.signIn.token).getCaveats());
  //     if (caveats.register) {
  //       trackEvent({ category: GA_EVENT_CATEGORIES.USER, action: "Registered", label: caveats.provider });
  //     }
  //     dispatch(initialize({ ...data.signIn, caveats }));
  //   });
  // };
=======
  const handleThirdPartySignIn = async ({ provider, token: thirdPartyToken, tenantId, redirectUri }) => {
    const { data } = await signIn({
      variables: { provider, token: thirdPartyToken, tenantId, redirectUri }
    });

    const caveats = macaroon.processCaveats(macaroon.deserialize(data.signIn.token).getCaveats());
    if (caveats.register) {
      trackEvent({ category: GA_EVENT_CATEGORIES.USER, action: "Registered", label: caveats.provider });
    }
    dispatch(initialize({ ...data.signIn, caveats }));
  };
>>>>>>> upstream/integration

  const isInvited = queryInvited !== undefined;

  const createForm =
    {
      [LOGIN]: () => (
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
      [OPTSCALE_MODE_QUERY_PARAMETER_NAME]: mode,
      [USER_EMAIL_QUERY_PARAMETER_NAME]: email,
      [SHOW_POLICY_QUERY_PARAM]: showPolicy
    } = getQueryParams() as {
      [NEXT_QUERY_PARAMETER_NAME]: string;
      [OPTSCALE_MODE_QUERY_PARAMETER_NAME]: string;
      [USER_EMAIL_QUERY_PARAMETER_NAME]: string;
      [SHOW_POLICY_QUERY_PARAM]: boolean | string;
    };

    return `${INITIALIZE}?${formQueryString({
      [NEXT_QUERY_PARAMETER_NAME]: next,
      [OPTSCALE_MODE_QUERY_PARAMETER_NAME]: mode,
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
            {/* <div>
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
            </div> */}
          </Stack>
        }
      />
    </Redirector>
  );
};

export default AuthorizationContainer;
