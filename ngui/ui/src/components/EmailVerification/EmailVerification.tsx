import { useState } from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Stack } from "@mui/system";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Greeter from "components/Greeter";
import ConfirmEmailVerificationCodeContainer from "containers/ConfirmEmailVerificationCodeContainer";
import { initialize } from "containers/InitializeContainer/redux";
import { INITIALIZE, SHOW_POLICY_QUERY_PARAM } from "urls";
import { SPACING_2 } from "utils/layouts";
import macaroon from "utils/macaroons";
import { formQueryString } from "utils/network";

const CONFIRM_VERIFICATION_CODE = 0;
const EMAIL_VERIFICATION_SUCCESS = 1;

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(CONFIRM_VERIFICATION_CODE);

  const [verificationCodeToken, setVerificationCodeToken] = useState<{
    user_id: string;
    user_email: string;
    token: string;
  }>();

  const stepContent = {
    [CONFIRM_VERIFICATION_CODE]: (
      <ConfirmEmailVerificationCodeContainer
        onSuccess={(token) => {
          setVerificationCodeToken(token);
          setStep(EMAIL_VERIFICATION_SUCCESS);
        }}
      />
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
            <Link
              color="primary"
              component="button"
              onClick={() => {
                const caveats = macaroon.processCaveats(macaroon.deserialize(verificationCodeToken.token).getCaveats());
                dispatch(initialize({ ...verificationCodeToken, caveats }));
                navigate(
                  `${INITIALIZE}?${formQueryString({
                    [SHOW_POLICY_QUERY_PARAM]: true
                  })}`
                );
              }}
            >
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
