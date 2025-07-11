import { CircularProgress, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { updateEnvironmentSshRequirement } from "api";
import { GET_RESOURCE, UPDATE_ENVIRONMENT_SSH_REQUIREMENT } from "api/restapi/actionTypes";
import Tooltip from "components/Tooltip";
import { useApiState } from "hooks/useApiState";
import { useOrganizationActionRestrictions } from "hooks/useOrganizationActionRestrictions";
import { SPACING_4 } from "utils/layouts";

const SshRequiredSwitchContainer = ({ isSshRequired, environmentId }) => {
  const dispatch = useDispatch();

  const { isRestricted, restrictionReasonMessage } = useOrganizationActionRestrictions();

  const { isLoading: isLoadingEnvironmentPatch } = useApiState(UPDATE_ENVIRONMENT_SSH_REQUIREMENT);
  const { isLoading: isGetResourceLoading } = useApiState(GET_RESOURCE);
  const isApiLoading = isLoadingEnvironmentPatch || isGetResourceLoading;

  const toggle = (requireSshKey) => {
    dispatch(updateEnvironmentSshRequirement(environmentId, requireSshKey));
  };

  const switchWithLabel = (
    <FormControlLabel
      control={
        <>
          <Switch checked={isSshRequired} disabled={isRestricted || isApiLoading} onClick={(e) => toggle(e.target.checked)} />
        </>
      }
      label={
        <Box display="flex" alignItems="center">
          <FormattedMessage id="requireSshKey" />
          {isApiLoading && <CircularProgress size={20} style={{ marginLeft: SPACING_4 }} />}
        </Box>
      }
    />
  );

  if (isRestricted) {
    return (
      <Tooltip title={restrictionReasonMessage} placement="top">
        <span>{switchWithLabel}</span>
      </Tooltip>
    );
  }

  return switchWithLabel;
};

export default SshRequiredSwitchContainer;
