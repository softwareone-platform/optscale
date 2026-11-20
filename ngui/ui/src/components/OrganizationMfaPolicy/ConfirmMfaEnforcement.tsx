import { useState } from "react";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import DeleteEntity from "components/DeleteEntity";

type ConfirmMfaEnforcementProps = {
  /** The state the confirmation leads to. */
  isEnforcing: boolean;
  /** Never rejects: the Security tab shows a failure on the page. */
  onConfirm: () => Promise<void>;
  onCancel: () => void;
};

/** The confirmation in `ChangeMfaEnforcementModal`; turning enforcement off is the destructive direction. */
const ConfirmMfaEnforcement = ({ isEnforcing, onConfirm, onCancel }: ConfirmMfaEnforcementProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const confirm = async () => {
    setIsConfirming(true);
    await onConfirm();
    onCancel();
  };

  return (
    <DeleteEntity
      onCancel={onCancel}
      isLoading={isConfirming}
      deleteButtonProps={{
        messageId: isEnforcing ? "mfaPolicy:turnOnConfirm" : "mfaPolicy:turnOffConfirm",
        color: isEnforcing ? "primary" : "error",
        onDelete: confirm
      }}
      dataTestIds={{
        deleteButton: "btn_confirm_mfa_enforcement",
        cancelButton: "btn_cancel_mfa_enforcement"
      }}
    >
      <Typography data-test-id="p_confirm_mfa_enforcement">
        <FormattedMessage id={isEnforcing ? "mfaPolicy:turnOnDescription" : "mfaPolicy:turnOffDescription"} />
      </Typography>
    </DeleteEntity>
  );
};

export default ConfirmMfaEnforcement;
