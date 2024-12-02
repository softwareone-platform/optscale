import { useState } from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Stack } from "@mui/system";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import Greeter from "components/Greeter";
import ConfirmEmailVerificationCodeContainer from "containers/ConfirmEmailVerificationCodeContainer";
import { HOME } from "urls";
import { SPACING_2 } from "utils/layouts";

const CONFIRM_VERIFICATION_CODE = 0;
const EMAIL_VERIFICATION_SUCCESS = 1;

const EmailVerification = () => {
  const [step, setStep] = useState(CONFIRM_VERIFICATION_CODE);

  const stepContent = {
    [CONFIRM_VERIFICATION_CODE]: (
      <ConfirmEmailVerificationCodeContainer onSuccess={() => setStep(EMAIL_VERIFICATION_SUCCESS)} />
    ),
    [EMAIL_VERIFICATION_SUCCESS]: (
      <Stack spacing={SPACING_2}>
        <div>
          <Typography>
            <FormattedMessage id="emailVerifiedSuccessfully" />
          </Typography>
        </div>
        <div>
          <Typography>
            <Link color="primary" to={HOME} component={RouterLink}>
              <FormattedMessage id="proceedToOptScale" />
            </Link>
          </Typography>
        </div>
      </Stack>
    )
  }[step];

  return <Greeter content={stepContent} />;
};

export default EmailVerification;
