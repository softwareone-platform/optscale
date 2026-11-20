import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { LoginChallenge } from "@theme/api/auth/signIn";
import { BackToLoginButton, formatCountdown, LoginChallengeScreen, useChallengeEnding } from "@theme/components/LoginChallenge";
import ChallengeAddMfaMethodModal from "@theme/components/SideModalManager/SideModals/ChallengeAddMfaMethodModal";
import { useFinishLoginChallenge } from "@theme/hooks/useFinishLoginChallenge";
import { useOpenSideModal } from "@theme/hooks/useOpenSideModal";
import AuthenticatorAppIcon from "@theme/icons/AuthenticatorAppIcon";
import FullWidthButton from "@theme/shared/components/FullWidthButton";
import { MPT_GRAY_4 } from "@theme/utils/layouts";
import { SPACING_2, SPACING_3 } from "utils/layouts";
import { useChallengeMfaEnrollment } from "./useChallengeMfaEnrollment";

const EnrollmentRequired = ({ challenge }: { challenge: LoginChallenge }) => {
  const finishLoginChallenge = useFinishLoginChallenge();
  const { secondsUntilExpiry, endChallenge } = useChallengeEnding(challenge);

  const openSideModal = useOpenSideModal();

  const calls = useChallengeMfaEnrollment({ challenge, onChallengeEnded: endChallenge, onTokenIssued: finishLoginChallenge });

  return (
    <Stack spacing={SPACING_3} alignItems="center">
      <Typography variant="subtitle1" fontWeight="bold" data-test-id="p_enrollment_required_title">
        <FormattedMessage id="signIn:enrollmentRequiredTitle" />
      </Typography>
      <AuthenticatorAppIcon color="primary" sx={{ fontSize: 90 }} />
      <Stack spacing={SPACING_2}>
        <Typography variant="body2" data-test-id="p_enrollment_required_description">
          <FormattedMessage id="signIn:enrollmentRequiredDescription" />
        </Typography>
        <Typography variant="body2">
          <FormattedMessage id="signIn:enrollmentRequiredNextStep" />
        </Typography>
      </Stack>
      <Stack spacing={SPACING_2} width="100%">
        <FullWidthButton
          messageId="signIn:setUpMfa"
          onClick={() =>
            openSideModal(ChallengeAddMfaMethodModal, {
              confirmedTypes: [],
              accountEmail: challenge.user_email,
              calls,
              challengeId: challenge.challenge_id
            })
          }
          dataTestId="btn_set_up_mfa"
        />
        <BackToLoginButton messageId="signOut" dataTestId="btn_sign_out" />
      </Stack>
      {/* Not in the designs: the challenge behind this screen lives five minutes (TDR), so the time left is shown. */}
      <Typography variant="caption" color={MPT_GRAY_4} data-test-id="p_challenge_status">
        <FormattedMessage id="signIn:challengeExpiresIn" values={{ time: formatCountdown(secondsUntilExpiry) }} />
      </Typography>
    </Stack>
  );
};

/**
 * An organization enforces MFA and the user has no method. No token exists yet (TDR, "Enforced without a method"): the
 * method is added with the challenge standing in for the token, and confirming it is what issues the token.
 */
const MfaEnrollmentStep = () => (
  <LoginChallengeScreen
    frame="card"
    renderChallenge={(challenge) => <EnrollmentRequired key={challenge.challenge_id} challenge={challenge} />}
  />
);

export default MfaEnrollmentStep;
