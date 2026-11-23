import RenameMfaMethod from "components/MfaSecuritySettings/RenameMfaMethod";
import { sideModalBase } from "./sideModalBase";

class RenameMfaMethodModal extends sideModalBase<{ currentName: string; onRename: (name: string) => Promise<void> }>() {
  // eslint-disable-next-line class-methods-use-this -- the header is the same for every payload
  get headerProps() {
    return {
      messageId: "mfaSettings:renameTitle",
      dataTestIds: {
        title: "title_rename_mfa_method",
        closeButton: "btn_close_rename_mfa_method"
      }
    };
  }

  dataTestId = "smodal_rename_mfa_method";

  get content() {
    return <RenameMfaMethod {...this.payload} onCancel={this.closeSideModal} />;
  }
}

export default RenameMfaMethodModal;
