import { useState } from "react";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import DeleteEntity from "components/DeleteEntity";

type RemoveMfaMethodProps = {
  /** Never rejects: the Security section shows a failure on the page. */
  onRemove: () => Promise<void>;
  onCancel: () => void;
};

/** The confirmation in `RemoveMfaMethodModal`, the app's usual delete side modal. */
const RemoveMfaMethod = ({ onRemove, onCancel }: RemoveMfaMethodProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const remove = async () => {
    setIsRemoving(true);
    await onRemove();
    onCancel();
  };

  return (
    <DeleteEntity
      onCancel={onCancel}
      isLoading={isRemoving}
      deleteButtonProps={{ messageId: "mfaSettings:remove", onDelete: remove }}
      dataTestIds={{
        deleteButton: "btn_confirm_remove_mfa_method",
        cancelButton: "btn_cancel_remove_mfa_method"
      }}
    >
      <Typography data-test-id="p_remove_mfa_method">
        <FormattedMessage id="mfaSettings:removeDescription" />
      </Typography>
    </DeleteEntity>
  );
};

export default RemoveMfaMethod;
