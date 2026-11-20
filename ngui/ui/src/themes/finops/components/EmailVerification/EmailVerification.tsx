import UpstreamEmailVerification from "@main/components/EmailVerification/EmailVerification";
import { useIsFeatureEnabled } from "@theme/hooks/useIsFeatureEnabled";
import EmailVerificationWithMfa from "./EmailVerificationWithMfa";

/** With `mfa_login` off this is upstream's verification, GraphQL and all. */
const EmailVerification = () =>
  useIsFeatureEnabled("mfa_login") ? <EmailVerificationWithMfa /> : <UpstreamEmailVerification />;

export default EmailVerification;
