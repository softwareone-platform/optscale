import UpstreamPasswordRecovery from "@main/components/PasswordRecovery/PasswordRecovery";
import { useIsFeatureEnabled } from "@theme/hooks/useIsFeatureEnabled";
import PasswordRecoveryWithMfa from "./PasswordRecoveryWithMfa";

/** With `mfa_login` off this is upstream's recovery, GraphQL and all. */
const PasswordRecovery = () => (useIsFeatureEnabled("mfa_login") ? <PasswordRecoveryWithMfa /> : <UpstreamPasswordRecovery />);

export default PasswordRecovery;
