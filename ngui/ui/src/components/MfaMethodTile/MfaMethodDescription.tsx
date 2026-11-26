import { FormattedMessage } from "react-intl";
import { MFA_METHOD_TYPE, MfaMethodType } from "api/auth/mfaMethod";

type MfaMethodDescriptionProps = {
  type: MfaMethodType;
  label: string;
};

/** A method's line under its name: the device an authenticator app is on, the masked address of an e-mail method. */
const MfaMethodDescription = ({ type, label }: MfaMethodDescriptionProps) =>
  type === MFA_METHOD_TYPE.TOTP ? <FormattedMessage id="mfaSettings:configuredOn" values={{ device: label }} /> : label;

export default MfaMethodDescription;
