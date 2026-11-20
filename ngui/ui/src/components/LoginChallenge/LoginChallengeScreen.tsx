import { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { Navigate } from "react-router-dom";
import { LoginChallenge } from "api/auth/signIn";
import Greeter from "components/Greeter";
import SignInCard from "components/SignInCard";
import { useLoginChallenge, useMfaTerminalFailure } from "hooks/useLoginChallenge";
import { LOGIN } from "urls";
import { SPACING_3 } from "utils/layouts";
import useStyles from "./LoginChallenge.styles";
import MfaChallengeEnded from "./MfaChallengeEnded";

type LoginChallengeScreenProps = {
  renderChallenge: (challenge: LoginChallenge) => ReactNode;
  /** `greeter` is the sign-in page's two columns; `card` the invitation screen's single card, as the enforced setup's designs. */
  frame?: "greeter" | "card";
};

/** What `/mfa` and `/mfa-enrollment` share: who is signing in, the challenge's own content, or how it ended. */
const LoginChallengeScreen = ({ renderChallenge, frame = "greeter" }: LoginChallengeScreenProps) => {
  const challenge = useLoginChallenge();
  const terminalFailure = useMfaTerminalFailure();
  const { classes } = useStyles();

  // Landing here with neither means the password was never verified in this session.
  if (!challenge && !terminalFailure) {
    return <Navigate replace to={LOGIN} />;
  }

  const signingInAs = (
    <Typography
      align="center"
      variant={frame === "card" ? "caption" : undefined}
      className={frame === "card" ? classes.note : undefined}
      data-test-id="p_signing_in_as"
    >
      <FormattedMessage id="signIn:signingInAs" values={{ email: challenge?.user_email ?? terminalFailure?.userEmail }} />
    </Typography>
  );

  const content = challenge ? renderChallenge(challenge) : terminalFailure && <MfaChallengeEnded failure={terminalFailure} />;

  if (frame === "card") {
    // The designs open on the reason; who is signing in moves under it.
    return (
      <SignInCard>
        {content}
        {signingInAs}
      </SignInCard>
    );
  }

  return (
    <Greeter
      content={
        <Stack spacing={SPACING_3} textAlign="left">
          {signingInAs}
          {content}
        </Stack>
      }
    />
  );
};

export default LoginChallengeScreen;
