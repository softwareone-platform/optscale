import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { AuthToken, CreateTokenResponse, isTooManyFailedAttemptsError } from "api/auth/signIn";
import { updateUserPassword } from "api/auth/users";
import { SignedInStep } from "components/CodeSignIn";
import CreateNewPasswordForm from "components/forms/CreateNewPasswordForm";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { useAsyncCall } from "hooks/useAsyncCall";
import { useCreateToken } from "hooks/useCreateToken";
import { getLoginUrl } from "urls";

type NewPasswordStepProps = {
  recoveryToken: AuthToken;
  /** The recovery went through a login challenge, so the account has MFA. */
  hasPassedMfa: boolean;
  onSignIn: (signIn: CreateTokenResponse) => void;
};

/**
 * Sets the new password, then signs in with it: the new password changes the salt every token is signed with, so
 * the recovery token is spent. That sign-in is a password one — with MFA on it answers a `202` too.
 *
 * After MFA it is skipped for the login page: its challenge would e-mail a code nobody enters, and the e-mail codes
 * are throttled per user, so the sign-in that follows within a minute gets none.
 */
const NewPasswordStep = ({ recoveryToken, hasPassedMfa, onSignIn }: NewPasswordStepProps) => {
  const { onCall: onUpdatePassword, isLoading: isUpdatingPassword } = useAsyncCall(updateUserPassword);
  const { onCreateToken, isLoading: isSigningIn } = useCreateToken();

  const navigate = useNavigate();

  const [errorMessageId, setErrorMessageId] = useState<string | null>(null);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const setPassword = async ({ newPassword }: { newPassword: string }) => {
    setErrorMessageId(null);

    try {
      await onUpdatePassword({ token: recoveryToken.token, userId: recoveryToken.user_id, password: newPassword });
    } catch {
      setErrorMessageId("somethingWentWrong");
      return;
    }

    if (hasPassedMfa) {
      setIsPasswordChanged(true);
      return;
    }

    try {
      onSignIn(await onCreateToken({ email: recoveryToken.user_email, password: newPassword }));
    } catch (error) {
      // The password is set and the recovery token is spent, so this form cannot be sent again: sign-in starts over.
      setErrorMessageId(isTooManyFailedAttemptsError(error) ? "signIn:challengeTooManyFailedAttempts" : null);
      setIsPasswordChanged(true);
    }
  };

  const error = errorMessageId && (
    <InlineSeverityAlert
      severity="error"
      messageId={errorMessageId}
      messageDataTestId="p_new_password_error"
      sx={{ mt: 2, width: "100%" }}
    />
  );

  if (isPasswordChanged) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <SignedInStep
          messageId="passwordChangedSuccessfully"
          onProceed={() => navigate(getLoginUrl(recoveryToken.user_email))}
          proceedMessageId="signIn"
        />
        {error}
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography>
        <FormattedMessage id="enterNewPasswordToResetAccountPassword" />
      </Typography>
      {error}
      <CreateNewPasswordForm
        email={recoveryToken.user_email}
        onSubmit={setPassword}
        isLoading={isUpdatingPassword || isSigningIn}
      />
    </Box>
  );
};

export default NewPasswordStep;
