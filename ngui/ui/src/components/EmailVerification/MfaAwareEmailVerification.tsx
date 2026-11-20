import { useIsMfaLoginEnabled } from "hooks/useIsMfaLoginEnabled";
import EmailVerification from "./EmailVerification";
import EmailVerificationWithMfa from "./EmailVerificationWithMfa";

/** With MFA login off this is the original verification, GraphQL and all. */
const MfaAwareEmailVerification = () => (useIsMfaLoginEnabled() ? <EmailVerificationWithMfa /> : <EmailVerification />);

export default MfaAwareEmailVerification;
