import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { AuthToken, CreateTokenResponse } from "api/auth/signIn";
import { updateUserPassword } from "api/auth/users";
import CreateNewPasswordForm from "components/forms/CreateNewPasswordForm";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { useAsyncCall } from "hooks/useAsyncCall";
import { useCreateToken } from "hooks/useCreateToken";

type NewPasswordStepProps = {
  recoveryToken: AuthToken;
  onSignIn: (signIn: CreateTokenResponse) => void;
};

/**
 * Sets the new password, then signs in with it: the new password changes the salt every token is signed with, so
 * the recovery token is spent. That sign-in is a password one — with MFA on it answers a `202` too.
 */
const NewPasswordStep = ({ recoveryToken, onSignIn }: NewPasswordStepProps) => {
  const { onCall: onUpdatePassword, isLoading: isUpdatingPassword } = useAsyncCall(updateUserPassword);
  const { onCreateToken, isLoading: isSigningIn } = useCreateToken();

  const [hasFailed, setHasFailed] = useState(false);

  const setPassword = async ({ newPassword }: { newPassword: string }) => {
    setHasFailed(false);

    try {
      await onUpdatePassword({ token: recoveryToken.token, userId: recoveryToken.user_id, password: newPassword });
      onSignIn(await onCreateToken({ email: recoveryToken.user_email, password: newPassword }));
    } catch {
      setHasFailed(true);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography>
        <FormattedMessage id="enterNewPasswordToResetAccountPassword" />
      </Typography>
      {hasFailed && (
        <InlineSeverityAlert
          severity="error"
          messageId="somethingWentWrong"
          messageDataTestId="p_new_password_error"
          sx={{ mt: 2, width: "100%" }}
        />
      )}
      <CreateNewPasswordForm onSubmit={setPassword} isLoading={isUpdatingPassword || isSigningIn} />
    </Box>
  );
};

export default NewPasswordStep;
