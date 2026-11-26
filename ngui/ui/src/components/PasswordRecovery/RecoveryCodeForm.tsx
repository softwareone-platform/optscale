import Stack from "@mui/material/Stack";
import FullWidthButton from "components/FullWidthButton";
import RememberYourPasswordSignInMessage from "components/RememberYourPasswordSignInMessage";
import VerificationCodeInput from "components/VerificationCodeInput";
import { useVerificationCodeEntry } from "components/VerificationCodeInput/useVerificationCodeEntry";
import SendVerificationCodeAgainContainer from "containers/SendVerificationCodeAgainContainer";
import { SPACING_2 } from "utils/layouts";
import { getSearchParams } from "utils/network";

type RecoveryCodeFormProps = {
  onSubmit: (values: { code: string }) => void;
  isLoading?: boolean;
};

/** Upstream's recovery code form with one box per digit, as on the MFA step. */
const RecoveryCodeForm = ({ onSubmit, isLoading = false }: RecoveryCodeFormProps) => {
  // Upstream fills in a code the URL carries; kept so such a link still works.
  const { code: codeFromUrl = "" } = getSearchParams({ parseNumbers: false }) as { code?: string };

  const { code, setCode, isCodeComplete, handleSubmit } = useVerificationCodeEntry(
    (enteredCode) => onSubmit({ code: enteredCode }),
    codeFromUrl
  );

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack spacing={SPACING_2}>
        <VerificationCodeInput value={code} onChange={setCode} disabled={isLoading} autoFocus />
        <SendVerificationCodeAgainContainer />
        <FullWidthButton
          type="submit"
          disabled={!isCodeComplete}
          isLoading={isLoading}
          messageId="confirm"
          dataTestId="btn_confirm_code"
        />
        <RememberYourPasswordSignInMessage />
      </Stack>
    </form>
  );
};

export default RecoveryCodeForm;
