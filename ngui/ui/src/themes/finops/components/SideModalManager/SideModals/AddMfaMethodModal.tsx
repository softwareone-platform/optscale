import AddMfaMethod, { AddMfaMethodProps } from "@theme/components/AddMfaMethod";
import { ADD_MFA_METHOD_MODAL_HEADER, ADD_MFA_METHOD_MODAL_TEST_ID } from "./addMfaMethodModalHeader";
import { sideModalBase } from "./sideModalBase";

/** Takes `AddMfaMethod`'s props but `onClose`, which is the side modal's own. */
class AddMfaMethodModal extends sideModalBase<Omit<AddMfaMethodProps, "onClose">>() {
  // eslint-disable-next-line class-methods-use-this -- the header is the same for every payload
  get headerProps() {
    return ADD_MFA_METHOD_MODAL_HEADER;
  }

  dataTestId = ADD_MFA_METHOD_MODAL_TEST_ID;

  get content() {
    return <AddMfaMethod {...this.payload} onClose={this.closeSideModal} />;
  }
}

export default AddMfaMethodModal;
