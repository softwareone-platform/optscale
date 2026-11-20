import { FormattedMessage } from "react-intl";
import { MfaMethodType } from "api/auth/mfaMethod";
import { MFA_METHOD_NAME_MESSAGE_ID } from "components/MfaMethodIcon";
import RemoveMfaMethod from "components/MfaSecuritySettings/RemoveMfaMethod";
import { sideModalBase } from "./sideModalBase";

/** The method's type names it in the header. */
class RemoveMfaMethodModal extends sideModalBase<{ methodType: MfaMethodType; onRemove: () => Promise<void> }>() {
  get headerProps() {
    return {
      messageId: "mfaSettings:removeTitle",
      formattedMessageValues: { method: <FormattedMessage id={MFA_METHOD_NAME_MESSAGE_ID[this.payload.methodType]} /> },
      color: "error" as const,
      dataTestIds: {
        title: "title_remove_mfa_method",
        closeButton: "btn_close_remove_mfa_method"
      }
    };
  }

  dataTestId = "smodal_remove_mfa_method";

  get content() {
    return <RemoveMfaMethod onRemove={this.payload.onRemove} onCancel={this.closeSideModal} />;
  }
}

export default RemoveMfaMethodModal;
