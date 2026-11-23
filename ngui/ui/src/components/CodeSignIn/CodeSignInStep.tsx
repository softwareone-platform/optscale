import { ComponentType, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { CreateTokenResponse, isInvalidVerificationCodeError, isTooManyFailedAttemptsError } from "api/auth/signIn";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { useCreateToken } from "hooks/useCreateToken";
import { getSearchParams } from "utils/network";

type CodeFormProps = {
  onSubmit: (values: { code: string }) => void;
  isLoading?: boolean;
};

type CodeSignInStepProps = {
  descriptionMessageId: string;
  /** Upstream's form for the flow — each has its own resend link. */
  CodeForm: ComponentType<CodeFormProps>;
  onSignIn: (signIn: CreateTokenResponse) => void;
};

const getCodeSignInErrorMessageId = (error: unknown) => {
  if (isTooManyFailedAttemptsError(error)) {
    return "signIn:challengeTooManyFailedAttempts";
  }

  return isInvalidVerificationCodeError(error) ? "signIn:invalidVerificationCode" : "somethingWentWrong";
};

/**
 * The e-mailed-code step of password recovery and e-mail verification. It signs in over REST rather than GraphQL,
 * whose `token` mutation has no way to return a `202`, so the caller decides what a challenge leads to.
 */
const CodeSignInStep = ({ descriptionMessageId, CodeForm, onSignIn }: CodeSignInStepProps) => {
  const { email } = getSearchParams() as { email: string };

  const { onCreateToken, isLoading } = useCreateToken();

  const [errorMessageId, setErrorMessageId] = useState<string | null>(null);

  const signIn = async ({ code }: { code: string }) => {
    setErrorMessageId(null);

    try {
      onSignIn(await onCreateToken({ email, verification_code: code }));
    } catch (error) {
      setErrorMessageId(getCodeSignInErrorMessageId(error));
    }
  };

  return (
    <Box>
      <Typography>
        <FormattedMessage id={descriptionMessageId} />
      </Typography>
      <Typography fontWeight="bold" gutterBottom>
        {email}
      </Typography>
      {errorMessageId && (
        <InlineSeverityAlert
          severity="error"
          messageId={errorMessageId}
          messageDataTestId="p_code_sign_in_error"
          sx={{ mb: 2 }}
        />
      )}
      <CodeForm onSubmit={signIn} isLoading={isLoading} />
    </Box>
  );
};

export default CodeSignInStep;
