import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import Button from "components/Button";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import ChangeMfaEnforcementModal from "components/SideModalManager/SideModals/ChangeMfaEnforcementModal";
import { useIsAllowed } from "hooks/useAllowedActions";
import { useOpenTypedSideModal } from "hooks/useOpenTypedSideModal";
import { useOrganizationMfaPolicy } from "hooks/useOrganizationMfaPolicy";
import { SPACING_1, SPACING_2 } from "utils/layouts";

/** Settings → Security: whether the organization enforces MFA. Every role sees it, a manager changes it. */
const OrganizationMfaPolicy = () => {
  const { status, hasLoaded, isEnforced, enforce, stopEnforcing, refetch } = useOrganizationMfaPolicy();
  const isManager = useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });

  const openSideModal = useOpenTypedSideModal();
  const [isChanging, setIsChanging] = useState(false);
  const [hasChangeFailed, setHasChangeFailed] = useState(false);

  // The switch shows what the service holds, so it reloads after a failed change too: another manager may have won.
  const change = async (action: () => Promise<unknown>) => {
    setHasChangeFailed(false);
    setIsChanging(true);

    try {
      await action();
    } catch {
      setHasChangeFailed(true);
    }

    await refetch();
    setIsChanging(false);
  };

  const renderSetting = () => {
    if (status === "loading" && !hasLoaded) {
      return <CircularProgress size={24} data-test-id="mfa_policy_loading" />;
    }

    if (status === "error" && !hasLoaded) {
      return (
        <Stack spacing={SPACING_1} alignItems="flex-start">
          <InlineSeverityAlert severity="error" messageId="mfaPolicy:loadFailed" messageDataTestId="p_mfa_policy_error" />
          <Button variant="outlined" messageId="retry" onClick={refetch} dataTestId="btn_retry_mfa_policy" />
        </Stack>
      );
    }

    return (
      <Stack spacing={SPACING_1} alignItems="flex-start">
        {/* A failed reload keeps the last state, so say it may be out of date. */}
        {status === "error" && (
          <InlineSeverityAlert severity="error" messageId="mfaPolicy:loadFailed" messageDataTestId="p_mfa_policy_error" />
        )}
        {hasChangeFailed && (
          <InlineSeverityAlert
            severity="error"
            messageId="mfaSettings:actionFailed"
            messageDataTestId="p_mfa_policy_change_error"
          />
        )}
        <FormControlLabel
          label={<FormattedMessage id="mfaPolicy:enforce" />}
          control={
            <Switch
              checked={isEnforced}
              disabled={!isManager || isChanging}
              onChange={() =>
                openSideModal(ChangeMfaEnforcementModal, {
                  isEnforcing: !isEnforced,
                  onConfirm: () => change(isEnforced ? stopEnforcing : enforce),
                })
              }
              // `as object`: the type of `inputProps` has no `data-*` keys, as in upstream's radio fields.
              inputProps={{ "data-test-id": "switch_enforce_mfa" } as object}
            />
          }
        />
        {!isManager && (
          <Typography variant="caption" data-test-id="p_mfa_policy_manager_only">
            <FormattedMessage id="mfaPolicy:managerOnly" />
          </Typography>
        )}
      </Stack>
    );
  };

  return (
    <Stack spacing={SPACING_2} data-test-id="organization_mfa_policy">
      <div>
        <Typography variant="subtitle1" fontWeight="bold">
          <FormattedMessage id="mfaSettings:title" />
        </Typography>
        <Typography variant="body2">
          <FormattedMessage id="mfaPolicy:description" />
        </Typography>
      </div>
      {renderSetting()}
    </Stack>
  );
};

export default OrganizationMfaPolicy;
