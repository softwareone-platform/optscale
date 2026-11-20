import { useEffect } from "react";
import AddMfaMethod, { AddMfaMethodProps } from "@theme/components/AddMfaMethod";
import { useLoginChallenge } from "@theme/hooks/useLoginChallenge";

export type ChallengeAddMfaMethodProps = AddMfaMethodProps & {
  challengeId: string;
};

/**
 * `AddMfaMethod` under a sign-in challenge. The side modal only closes on a route change, and an ended challenge stays
 * on the route, so the setup closes itself once its challenge is gone from the router state.
 */
const ChallengeAddMfaMethod = ({ challengeId, onClose, ...addMfaMethodProps }: ChallengeAddMfaMethodProps) => {
  const isChallengeGone = useLoginChallenge()?.challenge_id !== challengeId;

  useEffect(() => {
    if (isChallengeGone) {
      onClose();
    }
  }, [isChallengeGone, onClose]);

  return <AddMfaMethod {...addMfaMethodProps} onClose={onClose} />;
};

export default ChallengeAddMfaMethod;
