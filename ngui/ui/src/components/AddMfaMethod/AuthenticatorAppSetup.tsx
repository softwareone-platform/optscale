import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";
import { MFA_METHOD_TYPE } from "api/auth/mfaMethod";
import type { MfaMethodDetails } from "api/auth/mfaMethods";
import CopyText from "components/CopyText";
import MfaMethodIcon from "components/MfaMethodIcon";
import { SPACING_1, SPACING_2 } from "utils/layouts";
import useStyles from "./AddMfaMethod.styles";
import EnrollmentCodeForm from "./EnrollmentCodeForm";
import QrCode from "./QrCode";
import { MfaEnrollmentCalls } from "./types";
import { useEnrollment } from "./useEnrollment";

type AuthenticatorAppSetupProps = {
  calls: MfaEnrollmentCalls;
  onConfirmed: (method: MfaMethodDetails) => void;
  onClose: () => void;
};

const AuthenticatorAppSetup = ({ calls, onConfirmed, onClose }: AuthenticatorAppSetupProps) => {
  const { classes } = useStyles();
  const intl = useIntl();

  const enrollmentState = useEnrollment({ type: MFA_METHOD_TYPE.TOTP, calls, onConfirmed });
  const { enrollment, isStarting, rejectedCodeCount, start } = enrollmentState;

  // The secret only exists once enrollment has started, so it starts as soon as this step opens.
  useEffect(() => {
    start();
  }, [start]);

  return (
    <EnrollmentCodeForm
      // A rejected code starts the code entry over empty.
      key={rejectedCodeCount}
      enrollmentState={enrollmentState}
      onClose={onClose}
    >
      <Stack spacing={SPACING_2} alignItems="center" className={classes.setupIntro}>
        <MfaMethodIcon type={MFA_METHOD_TYPE.TOTP} />
        <div>
          <Typography fontWeight="bold">
            <FormattedMessage id="mfaSetup:scanQrCode" />
          </Typography>
          <Typography>
            <FormattedMessage id="mfaSetup:scanQrCodeDescription" />
          </Typography>
        </div>
        {isStarting && <CircularProgress data-test-id="mfa_setup_starting" />}
        {enrollment?.otpauth_uri && (
          <QrCode value={enrollment.otpauth_uri} label={intl.formatMessage({ id: "mfaSetup:qrCodeLabel" })} />
        )}
        {enrollment?.secret && (
          <Stack spacing={SPACING_1} alignItems="center">
            <div>
              <Typography fontWeight="bold">
                <FormattedMessage id="mfaSetup:cantScanCode" />
              </Typography>
              <Typography>
                <FormattedMessage id="mfaSetup:enterKeyManually" />
              </Typography>
            </div>
            <CopyText text={enrollment.secret} dataTestIds={{ button: "btn_copy_mfa_secret" }}>
              <span className={classes.secretKey} data-test-id="p_mfa_secret">
                {enrollment.secret}
              </span>
            </CopyText>
            <Typography variant="body2">
              <FormattedMessage id="mfaSetup:storeKeySafely" />
            </Typography>
          </Stack>
        )}
      </Stack>
    </EnrollmentCodeForm>
  );
};

export default AuthenticatorAppSetup;
