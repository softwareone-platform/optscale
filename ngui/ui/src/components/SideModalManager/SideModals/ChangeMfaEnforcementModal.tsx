import ConfirmMfaEnforcement from "components/OrganizationMfaPolicy/ConfirmMfaEnforcement";
import { sideModalBase } from "./sideModalBase";

class ChangeMfaEnforcementModal extends sideModalBase<{ isEnforcing: boolean; onConfirm: () => Promise<void> }>() {
  get headerProps() {
    return {
      messageId: this.payload.isEnforcing ? "mfaPolicy:turnOnTitle" : "mfaPolicy:turnOffTitle",
      color: this.payload.isEnforcing ? ("primary" as const) : ("error" as const),
      dataTestIds: {
        title: "title_change_mfa_enforcement",
        closeButton: "btn_close_change_mfa_enforcement",
      },
    };
  }

  dataTestId = "smodal_change_mfa_enforcement";

  get content() {
    return (
      <ConfirmMfaEnforcement
        isEnforcing={this.payload.isEnforcing}
        onConfirm={this.payload.onConfirm}
        onCancel={this.closeSideModal}
      />
    );
  }
}

export default ChangeMfaEnforcementModal;
