import { useState } from "react";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import type { MfaMethodDetails } from "api/auth/mfaMethods";
import MfaDeviceNameForm from "components/MfaDeviceNameForm";
import AuthenticatorAppEnrollment from "./AuthenticatorAppEnrollment";
import { MfaEnrollmentCalls } from "./types";

type AuthenticatorAppSetupProps = {
  calls: MfaEnrollmentCalls;
  onConfirmed: (method: MfaMethodDetails) => void;
  onClose: () => void;
};

/** Names the app first: the service needs the name to start the enrollment that returns the QR code. */
const AuthenticatorAppSetup = ({ calls, onConfirmed, onClose }: AuthenticatorAppSetupProps) => {
  const [deviceName, setDeviceName] = useState<string | null>(null);

  if (deviceName === null) {
    return (
      <MfaDeviceNameForm submitMessageId="next" onSubmit={setDeviceName} onCancel={onClose}>
        <Typography>
          <FormattedMessage id="mfaSetup:deviceNameDescription" />
        </Typography>
      </MfaDeviceNameForm>
    );
  }

  return <AuthenticatorAppEnrollment deviceName={deviceName} calls={calls} onConfirmed={onConfirmed} onClose={onClose} />;
};

export default AuthenticatorAppSetup;
