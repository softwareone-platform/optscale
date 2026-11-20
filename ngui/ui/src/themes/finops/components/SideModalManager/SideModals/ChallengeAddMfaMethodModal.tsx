import ChallengeAddMfaMethod, { ChallengeAddMfaMethodProps } from "@theme/components/MfaEnrollmentStep/ChallengeAddMfaMethod";
import { ADD_MFA_METHOD_MODAL_HEADER, ADD_MFA_METHOD_MODAL_TEST_ID } from "./addMfaMethodModalHeader";
import { sideModalBase } from "./sideModalBase";

/** `AddMfaMethodModal` for the enforced setup while signing in: it also closes once its challenge has ended. */
class ChallengeAddMfaMethodModal extends sideModalBase<Omit<ChallengeAddMfaMethodProps, "onClose">>() {
  // eslint-disable-next-line class-methods-use-this -- the header is the same for every payload
  get headerProps() {
    return ADD_MFA_METHOD_MODAL_HEADER;
  }

  dataTestId = ADD_MFA_METHOD_MODAL_TEST_ID;

  get content() {
    return <ChallengeAddMfaMethod {...this.payload} onClose={this.closeSideModal} />;
  }
}

export default ChallengeAddMfaMethodModal;
