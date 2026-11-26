import { useState } from "react";
import MfaDeviceNameForm from "components/MfaDeviceNameForm";

type RenameMfaMethodProps = {
  currentName: string;
  /** Never rejects: the Security section shows a failure on the page. */
  onRename: (name: string) => Promise<void>;
  onCancel: () => void;
};

/** The content of `RenameMfaMethodModal`: a new name for an authenticator app. */
const RenameMfaMethod = ({ currentName, onRename, onCancel }: RenameMfaMethodProps) => {
  const [isRenaming, setIsRenaming] = useState(false);

  const rename = async (name: string) => {
    setIsRenaming(true);
    await onRename(name);
    onCancel();
  };

  return (
    <MfaDeviceNameForm
      defaultName={currentName}
      submitMessageId="save"
      isLoading={isRenaming}
      onSubmit={rename}
      onCancel={onCancel}
    />
  );
};

export default RenameMfaMethod;
