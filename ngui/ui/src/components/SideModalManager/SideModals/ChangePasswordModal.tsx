import ChangePasswordForm from "components/PasswordSecuritySettings/ChangePasswordForm";
import { sideModalBase } from "./sideModalBase";

class ChangePasswordModal extends sideModalBase<Record<string, never>>() {
  // eslint-disable-next-line class-methods-use-this -- the header is the same for every payload
  get headerProps() {
    return {
      messageId: "passwordSettings:changePassword",
      dataTestIds: {
        title: "title_change_password",
        closeButton: "btn_close_change_password",
      },
    };
  }

  dataTestId = "smodal_change_password";

  get content() {
    return <ChangePasswordForm onClose={this.closeSideModal} />;
  }
}

export default ChangePasswordModal;
