import { useIsMfaLoginEnabled } from "hooks/useIsMfaLoginEnabled";
import PasswordRecovery from "./PasswordRecovery";
import PasswordRecoveryWithMfa from "./PasswordRecoveryWithMfa";

/** With MFA login off this is the original recovery, GraphQL and all. */
const MfaAwarePasswordRecovery = () => (useIsMfaLoginEnabled() ? <PasswordRecoveryWithMfa /> : <PasswordRecovery />);

export default MfaAwarePasswordRecovery;
