import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { AUTH_ERROR_CODE, AuthApiError } from "api/auth/errors";
import Button from "components/Button";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import AddMfaMethodModal from "components/SideModalManager/SideModals/AddMfaMethodModal";
import RemoveMfaMethodModal from "components/SideModalManager/SideModals/RemoveMfaMethodModal";
import RenameMfaMethodModal from "components/SideModalManager/SideModals/RenameMfaMethodModal";
import { useOrganizations } from "hooks/coreData/useOrganizations";
import { useGetToken } from "hooks/useGetToken";
import { useMfaStatus } from "hooks/useMfaStatus";
import { useOpenTypedSideModal } from "hooks/useOpenTypedSideModal";
import { useSignedInMfaEnrollment } from "hooks/useSignedInMfaEnrollment";
import { useSignedInMfaMethodActions } from "hooks/useSignedInMfaMethodActions";
import { SPACING_1, SPACING_2 } from "utils/layouts";
import MfaMethodCard from "./MfaMethodCard";

/** The MFA section of Profile → Security: the user's methods, adding one, choosing the default and removing one. */
const MfaSecuritySettings = () => {
  const { userEmail } = useGetToken();
  const { status, data, refetch } = useMfaStatus();
  const calls = useSignedInMfaEnrollment();
  const actions = useSignedInMfaMethodActions();
  const organizations = useOrganizations();

  const openSideModal = useOpenTypedSideModal();
  const [isChanging, setIsChanging] = useState(false);
  const [actionErrorMessageId, setActionErrorMessageId] = useState<string | null>(null);

  const methods = data?.methods ?? [];
  // The service names organizations by id; the ones this user belongs to are already in the app's cache.
  const enforcingOrganizationNames = organizations
    .filter(({ id }) => data?.enforcing_organizations.includes(id))
    .map(({ name }) => name);
  const hasMethods = methods.length > 0;
  // With MFA enforced the user must keep a method, so the only one cannot go.
  const removeBlockedMessageId = data?.mfa_enforced && methods.length === 1 ? "mfaSettings:lastMethodEnforced" : null;

  // One change at a time; the list reloads after it, so it shows what the service holds.
  const runAction = async (action: () => Promise<unknown>) => {
    setActionErrorMessageId(null);
    setIsChanging(true);

    try {
      await action();
      await refetch();
    } catch (error) {
      // The list was out of date: the organization started enforcing MFA after it loaded.
      const isLastMethodEnforced =
        error instanceof AuthApiError && error.errorCode === AUTH_ERROR_CODE.LAST_MFA_METHOD_ENFORCED;

      setActionErrorMessageId(isLastMethodEnforced ? "mfaSettings:lastMethodEnforced" : "mfaSettings:actionFailed");
    } finally {
      setIsChanging(false);
    }
  };

  const renderMethods = () => {
    // A reload after adding keeps the list on screen instead of flashing a spinner.
    if (status === "loading" && !data) {
      return <CircularProgress size={24} data-test-id="mfa_methods_loading" />;
    }

    if (status === "error" && !data) {
      return (
        <Stack spacing={SPACING_1} alignItems="flex-start">
          <InlineSeverityAlert severity="error" messageId="mfaSettings:loadFailed" messageDataTestId="p_mfa_methods_error" />
          <Button variant="outlined" messageId="retry" onClick={refetch} dataTestId="btn_retry_mfa_methods" />
        </Stack>
      );
    }

    return (
      // Tiles fill their container, so the list sets a readable width.
      <Stack spacing={SPACING_2} alignItems="flex-start" maxWidth={480}>
        {/* A failed reload keeps the last list, so say it may be out of date. */}
        {status === "error" && (
          <InlineSeverityAlert severity="error" messageId="mfaSettings:loadFailed" messageDataTestId="p_mfa_methods_error" />
        )}
        {actionErrorMessageId && (
          <InlineSeverityAlert severity="error" messageId={actionErrorMessageId} messageDataTestId="p_mfa_action_error" />
        )}
        {methods.map((method) => (
          <MfaMethodCard
            key={method.id}
            method={method}
            onSetDefault={() => runAction(() => actions.setDefault(method.id))}
            onRename={() =>
              openSideModal(RenameMfaMethodModal, {
                currentName: method.label ?? "",
                onRename: (name) => runAction(() => actions.rename(method.id, name)),
              })
            }
            onRemove={() =>
              openSideModal(RemoveMfaMethodModal, {
                methodType: method.type,
                onRemove: () => runAction(() => actions.remove(method.id)),
              })
            }
            removeBlockedMessageId={removeBlockedMessageId}
            isBusy={isChanging}
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          messageId={hasMethods ? "mfaSettings:addMethod" : "mfaSettings:enableMfa"}
          onClick={() =>
            openSideModal(AddMfaMethodModal, {
              confirmedTypes: methods.map(({ type }) => type),
              accountEmail: userEmail ?? "",
              calls,
              onConfirmed: refetch,
            })
          }
          dataTestId={hasMethods ? "btn_add_mfa_method" : "btn_enable_mfa"}
        />
      </Stack>
    );
  };

  return (
    <Stack spacing={SPACING_2} data-test-id="mfa_security_settings">
      <div>
        <Typography variant="subtitle1" fontWeight="bold">
          <FormattedMessage id="mfaSettings:title" />
        </Typography>
        <Typography variant="body2">
          <FormattedMessage id="mfaSettings:description" />
        </Typography>
      </div>
      {data?.mfa_enforced && (
        <Tooltip
          title={
            enforcingOrganizationNames.length > 0 && (
              <FormattedMessage id="mfaSettings:enforcedBy" values={{ organizations: enforcingOrganizationNames.join(", ") }} />
            )
          }
          placement="bottom-start"
        >
          <div data-test-id="mfa_enforced_note">
            <InlineSeverityAlert messageId="mfaSettings:enforcedByOrganization" messageDataTestId="p_mfa_enforced" />
          </div>
        </Tooltip>
      )}
      {renderMethods()}
    </Stack>
  );
};

export default MfaSecuritySettings;
