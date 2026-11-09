import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { formatCountdown } from "./utils";

const COUNTDOWN_ATTEMPTS_SEPARATOR = " · ";

type ChallengeStatusProps = {
  secondsUntilExpiry: number;
  attemptsLeft: number;
};

const ChallengeStatus = ({ secondsUntilExpiry, attemptsLeft }: ChallengeStatusProps) => (
  <Typography variant="body2" align="center" color="text.primary" data-test-id="p_challenge_status">
    <FormattedMessage id="signIn:challengeExpiresIn" values={{ time: formatCountdown(secondsUntilExpiry) }} />
    {COUNTDOWN_ATTEMPTS_SEPARATOR}
    <Typography
      component="span"
      variant="body2"
      fontWeight={attemptsLeft === 1 ? "bold" : undefined}
      color={attemptsLeft === 1 ? "error" : "text.primary"}
      data-test-id="p_attempts_left"
    >
      <FormattedMessage id="signIn:attemptsLeft" values={{ count: attemptsLeft }} />
    </Typography>
  </Typography>
);

export default ChallengeStatus;
