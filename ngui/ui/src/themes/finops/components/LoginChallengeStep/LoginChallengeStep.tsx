import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { useLoginChallenge } from "@theme/hooks/useLoginChallenge";
import Greeter from "components/Greeter";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { LOGIN } from "urls";
import { SPACING_2 } from "utils/layouts";

type LoginChallengeStepProps = {
  titleMessageId: string;
  descriptionMessageId: string;
};

/**
 * Placeholder for the MFA screens the password step routes into. It renders what the challenge
 * already tells us and is replaced once the verification and enrollment screens are built.
 */
const LoginChallengeStep = ({ titleMessageId, descriptionMessageId }: LoginChallengeStepProps) => {
  const challenge = useLoginChallenge();

  // Landing here without a challenge means the password was never verified in this session.
  if (!challenge) {
    return <Navigate replace to={LOGIN} />;
  }

  return (
    <Greeter
      content={
        <Stack spacing={SPACING_2}>
          <Typography variant="h6" data-test-id="p_login_challenge_title">
            <FormattedMessage id={titleMessageId} />
          </Typography>
          <Typography data-test-id="p_signing_in_as">
            <FormattedMessage id="signIn:signingInAs" values={{ email: challenge.user_email }} />
          </Typography>
          <Typography>
            <FormattedMessage id={descriptionMessageId} />
          </Typography>
          <InlineSeverityAlert messageId="signIn:challengeNotImplemented" messageDataTestId="p_not_implemented" />
          <Typography>
            <Link color="primary" to={LOGIN} component={RouterLink} data-test-id="link_back_to_login">
              <FormattedMessage id="back" />
            </Link>
          </Typography>
        </Stack>
      }
    />
  );
};

export default LoginChallengeStep;
