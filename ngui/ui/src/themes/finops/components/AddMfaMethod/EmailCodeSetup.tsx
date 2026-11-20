import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";
import { MFA_METHOD_TYPE } from "@theme/api/auth/mfaMethod";
import type { MfaMethodDetails } from "@theme/api/auth/mfaMethods";
import Button from "@theme/components/Button/Button";
import MfaMethodIcon from "@theme/components/MfaMethodIcon";
import { SPACING_2 } from "utils/layouts";
import useStyles from "./AddMfaMethod.styles";
import EnrollmentCodeForm from "./EnrollmentCodeForm";
import { MfaEnrollmentCalls } from "./types";
import { useEnrollment } from "./useEnrollment";

type EmailCodeSetupProps = {
  /** The address the service always mails the code to — the account's own, not a typed one. */
  accountEmail: string;
  calls: MfaEnrollmentCalls;
  onConfirmed: (method: MfaMethodDetails) => void;
  onClose: () => void;
};

const EmailCodeSetup = ({ accountEmail, calls, onConfirmed, onClose }: EmailCodeSetupProps) => {
  const { classes } = useStyles();
  const intl = useIntl();

  const enrollmentState = useEnrollment({ type: MFA_METHOD_TYPE.EMAIL, calls, onConfirmed });
  const { enrollment, isStarting, rejectedCodeCount, start } = enrollmentState;

  return (
    <EnrollmentCodeForm
      // A rejected code starts the code entry over empty.
      key={rejectedCodeCount}
      enrollmentState={enrollmentState}
      onClose={onClose}
    >
      <Stack spacing={SPACING_2}>
        <Stack spacing={SPACING_2} alignItems="center" className={classes.setupIntro}>
          <MfaMethodIcon type={MFA_METHOD_TYPE.EMAIL} />
          <div>
            <Typography fontWeight="bold">
              <FormattedMessage id="mfaSetup:howItWorks" />
            </Typography>
            <Typography>
              <FormattedMessage id="mfaSetup:howItWorksDescription" />
            </Typography>
          </div>
        </Stack>
        <TextField
          label={intl.formatMessage({ id: "mfaSetup:emailAddress" })}
          value={accountEmail}
          size="small"
          fullWidth
          InputProps={{ readOnly: true }}
          inputProps={{ "data-test-id": "input_mfa_setup_email" }}
        />
        {enrollment ? (
          <Stack spacing={1} alignItems="center">
            <Typography data-test-id="p_mfa_setup_code_sent">
              <FormattedMessage id="mfaSetup:codeSentTo" values={{ email: enrollment.label }} />
            </Typography>
            <Link component="button" type="button" onClick={start} data-test-id="btn_mfa_setup_send_code_again">
              <FormattedMessage id="mfaSetup:sendCodeAgain" />
            </Link>
          </Stack>
        ) : (
          <Button
            variant="contained"
            color="primary"
            messageId="mfaSetup:sendVerificationCode"
            disabled={isStarting}
            isLoading={isStarting}
            onClick={start}
            dataTestId="btn_mfa_setup_send_code"
          />
        )}
      </Stack>
    </EnrollmentCodeForm>
  );
};

export default EmailCodeSetup;
