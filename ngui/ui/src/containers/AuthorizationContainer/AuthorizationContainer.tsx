import { Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { GET_TOKEN } from "api/auth/actionTypes";
import LoginForm from "components/forms/LoginForm";
import RegistrationForm from "components/forms/RegistrationForm";
import Greeter from "components/Greeter";
import Redirector from "components/Redirector";
import { useApiData } from "hooks/useApiData";
import { useNewAuthorization } from "hooks/useNewAuthorization";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { HOME_FIRST_TIME, HOME, REGISTER, LOGIN } from "urls";
import { SPACING_4 } from "utils/layouts";
import { getQueryParams } from "utils/network";

export const getLoginRedirectionPath = (scopeUserEmail: string) => {
  const { next = HOME, userEmail: userEmailQueryParameter } = getQueryParams();

  if (userEmailQueryParameter) {
    return userEmailQueryParameter === scopeUserEmail ? next : HOME;
  }

  return next;
};

const AuthorizationContainer = () => {
  const { pathname } = useLocation();

  const { invited: queryInvited, next = HOME } = getQueryParams();

  const { authorize, register, isRegistrationInProgress, isAuthInProgress } = useNewAuthorization();

  const { isDemo } = useOrganizationInfo();
  const {
    apiData: { token }
  } = useApiData(GET_TOKEN);
  const isTokenExists = Boolean(token);

  const onSubmitRegister = ({ name, email, password }) => {
    register(
      { name, email, password },
      {
        getOnSuccessRedirectionPath: () => HOME_FIRST_TIME
      }
    );
  };

  const onSubmitLogin = ({ email, password }) => {
    authorize(
      { email, password },
      {
        getOnSuccessRedirectionPath: ({ userEmail }) => getLoginRedirectionPath(userEmail)
      }
    );
  };
  /* MPT_TODO: disabled other authentication sources */
  // const onThirdPartySignIn = (provider, params) =>
  //   thirdPartySignIn(
  //     { provider, params },
  //     {
  //       getOnSuccessRedirectionPath: ({ userEmail }) => getLoginRedirectionPath(userEmail)
  //     }
  //   );

  // isGetTokenLoading used for LoginForm, isCreateUserLoading for RegistrationForm
  const isLoading = isRegistrationInProgress || isAuthInProgress;

  const isInvited = queryInvited !== undefined;

  const createForm =
    {
      [LOGIN]: () => <LoginForm onSubmit={onSubmitLogin} isLoading={isLoading} isInvited={isInvited} />,
      [REGISTER]: () => <RegistrationForm onSubmit={onSubmitRegister} isLoading={isLoading} isInvited={isInvited} />
    }[pathname] || (() => null);

  // redirecting already authorized user from /login and /register pages
  const shouldRedirectAuthorizedUser = !isAuthInProgress && !isRegistrationInProgress && !isDemo && isTokenExists;

  return (
    <Redirector condition={shouldRedirectAuthorizedUser} to={next}>
      <Greeter
        content={
          <Stack spacing={SPACING_4}>
            <div>{createForm()}</div>
            {/* MPT_TODO: disabled other authentication sources */}
            {/* <div> */}
            {/* <OAuthSignIn */}
            {/*    googleButton={ */}
            {/*      <GoogleAuthButton */}
            {/*        thirdPartySignIn={onThirdPartySignIn} */}
            {/*        setIsAuthInProgress={setIsAuthInProgress} */}
            {/*        isAuthInProgress={isAuthInProgress} */}
            {/*        isRegistrationInProgress={isRegistrationInProgress} */}
            {/*      /> */}
            {/*    } */}
            {/*    microsoftButton={ */}
            {/*      <MicrosoftSignInButton */}
            {/*        thirdPartySignIn={onThirdPartySignIn} */}
            {/*        setIsAuthInProgress={setIsAuthInProgress} */}
            {/*        isAuthInProgress={isAuthInProgress} */}
            {/*        isRegistrationInProgress={isRegistrationInProgress} */}
            {/*      /> */}
            {/*    } */}
            {/*  /> */}
            {/* </div> */}
          </Stack>
        }
      />
    </Redirector>
  );
};

export default AuthorizationContainer;
