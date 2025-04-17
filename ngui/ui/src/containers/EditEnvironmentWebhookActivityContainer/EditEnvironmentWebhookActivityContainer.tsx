import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { updateWebhook } from "api";
import Tooltip from "components/Tooltip";
import { useOrganizationActionRestrictions } from "hooks/useOrganizationActionRestrictions";

const EditEnvironmentWebhookActivityContainer = ({ webhookId, isActive = false }) => {
  const dispatch = useDispatch();

  const { isRestricted, restrictionReasonMessage } = useOrganizationActionRestrictions();

  const toggle = (newIsActive) => dispatch(updateWebhook(webhookId, { active: newIsActive }));

  return (
    <Tooltip title={restrictionReasonMessage} placement="top">
      <span>
        <Switch checked={isActive} disabled={isRestricted} onClick={(e) => toggle(e.target.checked)} />
      </span>
    </Tooltip>
  );
};

export default EditEnvironmentWebhookActivityContainer;
