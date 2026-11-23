import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MFA_METHOD_TYPE, MfaMethodType } from "api/auth/mfaMethod";
import type { MfaMethodDetails } from "api/auth/mfaMethods";
import { SPACING_2 } from "utils/layouts";
import AuthenticatorAppSetup from "./AuthenticatorAppSetup";
import { ADD_MFA_METHOD_STEP } from "./constants";
import EmailCodeSetup from "./EmailCodeSetup";
import MfaMethodChoice from "./MfaMethodChoice";
import { AddMfaMethodStep, MfaEnrollmentCalls } from "./types";

// The choice has none of its own: the side modal's header says "Add authentication method".
const SETUP_TITLE_MESSAGE_ID: Record<Exclude<AddMfaMethodStep, typeof ADD_MFA_METHOD_STEP.CHOOSE>, string> = {
  [ADD_MFA_METHOD_STEP.AUTHENTICATOR_APP]: "mfaSetup:authenticatorAppTitle",
  [ADD_MFA_METHOD_STEP.EMAIL_CODE]: "mfaSetup:emailCodeTitle"
};

const SETUP_STEP: Record<MfaMethodType, AddMfaMethodStep> = {
  [MFA_METHOD_TYPE.TOTP]: ADD_MFA_METHOD_STEP.AUTHENTICATOR_APP,
  [MFA_METHOD_TYPE.EMAIL]: ADD_MFA_METHOD_STEP.EMAIL_CODE
};

export type AddMfaMethodProps = {
  /** Types the user already has a confirmed method of — e-mail cannot be added again. */
  confirmedTypes: MfaMethodType[];
  accountEmail: string;
  calls: MfaEnrollmentCalls;
  /** The method is confirmed; the caller refreshes what it shows. The side modal closes after it. */
  onConfirmed?: (method: MfaMethodDetails) => void;
  onClose: () => void;
};

/**
 * "Add authentication method", the content of `AddMfaMethodModal`: choose a type, set it up, confirm it with a code.
 * Closing before the code is confirmed saves nothing — the service discards a pending method after 15 minutes.
 */
const AddMfaMethod = ({ confirmedTypes, accountEmail, calls, onConfirmed, onClose }: AddMfaMethodProps) => {
  const [step, setStep] = useState<AddMfaMethodStep>(ADD_MFA_METHOD_STEP.CHOOSE);

  const handleConfirmed = (method: MfaMethodDetails) => {
    onConfirmed?.(method);
    onClose();
  };

  if (step === ADD_MFA_METHOD_STEP.CHOOSE) {
    return <MfaMethodChoice confirmedTypes={confirmedTypes} onChoose={(type) => setStep(SETUP_STEP[type])} />;
  }

  return (
    <Stack spacing={SPACING_2}>
      <Typography variant="subtitle1" fontWeight="bold" data-test-id="p_mfa_setup_title">
        <FormattedMessage id={SETUP_TITLE_MESSAGE_ID[step]} />
      </Typography>
      {step === ADD_MFA_METHOD_STEP.AUTHENTICATOR_APP ? (
        <AuthenticatorAppSetup calls={calls} onConfirmed={handleConfirmed} onClose={onClose} />
      ) : (
        <EmailCodeSetup accountEmail={accountEmail} calls={calls} onConfirmed={handleConfirmed} onClose={onClose} />
      )}
    </Stack>
  );
};

export default AddMfaMethod;
