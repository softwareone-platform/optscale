import { useState } from "react";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import { MFA_STATUS } from "api/auth/mfaMethods";
import { useMfaStatus } from "hooks/useMfaStatus";
import { PROFILE } from "urls";
import { MFA_SETUP_PROMPT_DISMISSED_STORAGE_KEY } from "./constants";

const SECURITY_TAB_URL = `${PROFILE}?tab=security`;

const PromptUnlessMfaConfigured = ({ onDismiss }: { onDismiss: () => void }) => {
  const { status, data } = useMfaStatus();

  // Nothing while loading or after an error: the prompt is a nudge, not something worth an error of its own.
  if (status !== "loaded" || data.status !== MFA_STATUS.NOT_CONFIGURED) {
    return null;
  }

  return (
    <Alert severity="info" onClose={onDismiss} sx={{ mb: 2 }} data-test-id="mfa_setup_prompt">
      <FormattedMessage id="mfaSettings:promptMessage" />{" "}
      <Link component={RouterLink} to={SECURITY_TAB_URL} data-test-id="link_mfa_setup_prompt">
        <FormattedMessage id="mfaSettings:promptLink" />
      </Link>
    </Alert>
  );
};

/** Nudges a user without MFA towards Profile → Security; hidden once a method exists or after dismissing. */
const MfaSetupPrompt = () => {
  const [isDismissed, setIsDismissed] = useState(() => localStorage.getItem(MFA_SETUP_PROMPT_DISMISSED_STORAGE_KEY) === "true");

  // A dismissed prompt never mounts the status fetch, so the dashboard stops asking for it.
  if (isDismissed) {
    return null;
  }

  const dismiss = () => {
    localStorage.setItem(MFA_SETUP_PROMPT_DISMISSED_STORAGE_KEY, "true");
    setIsDismissed(true);
  };

  return <PromptUnlessMfaConfigured onDismiss={dismiss} />;
};

export default MfaSetupPrompt;
