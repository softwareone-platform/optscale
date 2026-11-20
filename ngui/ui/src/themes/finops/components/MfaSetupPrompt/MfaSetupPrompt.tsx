import { useState } from "react";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { MFA_STATUS } from "@theme/api/auth/mfaMethods";
import { useMfaStatus } from "@theme/hooks/useMfaStatus";
import { PROFILE } from "@theme/urls";
import { MFA_SETUP_PROMPT_DISMISSED_STORAGE_KEY } from "./constants";

const SECURITY_TAB_URL = `${PROFILE}?tab=security`;

/** Nudges a user without MFA towards Profile → Security; hidden once a method exists or after dismissing. */
const MfaSetupPrompt = () => {
  const { status, data } = useMfaStatus();

  const [isDismissed, setIsDismissed] = useState(() => localStorage.getItem(MFA_SETUP_PROMPT_DISMISSED_STORAGE_KEY) === "true");

  // Nothing while loading or after an error: the prompt is a nudge, not something worth an error of its own.
  if (isDismissed || status !== "loaded" || data.status !== MFA_STATUS.NOT_CONFIGURED) {
    return null;
  }

  const dismiss = () => {
    localStorage.setItem(MFA_SETUP_PROMPT_DISMISSED_STORAGE_KEY, "true");
    setIsDismissed(true);
  };

  return (
    <Alert severity="info" onClose={dismiss} sx={{ mb: 2 }} data-test-id="mfa_setup_prompt">
      <FormattedMessage id="mfaSettings:promptMessage" />{" "}
      <Link component={RouterLink} to={SECURITY_TAB_URL} data-test-id="link_mfa_setup_prompt">
        <FormattedMessage id="mfaSettings:promptLink" />
      </Link>
    </Alert>
  );
};

export default MfaSetupPrompt;
