import { CircularProgress, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { updateEnvironmentSshRequirement } from "api";
import { GET_RESOURCE, UPDATE_ENVIRONMENT_SSH_REQUIREMENT } from "api/restapi/actionTypes";
import Tooltip from "components/Tooltip";
import { useApiState } from "hooks/useApiState";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { SPACING_4 } from "utils/layouts";

const SshRequiredSwitchContainer = ({ isSshRequired, environmentId }) => {
  const dispatch = useDispatch();

  const { isDemo } = useOrganizationInfo();

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
          <Switch
            checked={isSshRequired}
            disabled={isDemo || isApiLoading}
            onClick={!isDemo ? (e) => toggle(e.target.checked) : undefined}
          />
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

  return isDemo ? (
    <Tooltip title={<FormattedMessage id="notAvailableInLiveDemo" />}>
      <span>{switchWithLabel}</span>
    </Tooltip>
  ) : (
    switchWithLabel
  );
};

export default SshRequiredSwitchContainer;
