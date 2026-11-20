import { ComponentProps } from "react";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { VERIFICATION_CODE_LENGTH } from "./constants";
import VerificationCodeInput from "./VerificationCodeInput";

type VerificationCodeFieldProps = Pick<
  ComponentProps<typeof VerificationCodeInput>,
  "value" | "onChange" | "disabled" | "autoFocus"
>;

/** "Enter the 6-digit code" over the input. A fragment: the two take the spacing of the stack they are put in. */
const VerificationCodeField = (props: VerificationCodeFieldProps) => (
  <>
    <Typography fontWeight="bold" align="center">
      <FormattedMessage id="signIn:enterVerificationCode" values={{ length: VERIFICATION_CODE_LENGTH }} />
    </Typography>
    <VerificationCodeInput {...props} />
  </>
);

export default VerificationCodeField;
