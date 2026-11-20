import { ReactNode, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { requestAuth } from "api/auth/request";
import { TOKEN_BODY } from "api/mocked/auth/signIn/fixtures";
import { MOCKED_REAL_SESSION_PATH } from "api/mocked/config";
import { RealSessionStatus } from "api/mocked/state/realSession";
import { useGetToken } from "hooks/useGetToken";
import { useSignOut } from "hooks/useSignOut";
import { LOGIN } from "urls";
import useStyles from "./MockedApiDevPanel.styles";

type StoredSession = RealSessionStatus["session"];

type SessionState = { status: "loading" } | { status: "error" } | { status: "loaded"; session: StoredSession };

const formatCapturedAt = (capturedAt: number) => new Date(capturedAt * 1000).toLocaleString();

/**
 * Captures the signed-in user's real token for the mocked sign-in to hand out, so a mocked MFA sign-in lands in an
 * app whose real API calls work. The token goes to the dev server, never into a cookie: cookies on this origin
 * also ride along with every proxied request.
 */
const RealSessionSection = ({ onChooseRealSignIn }: { onChooseRealSignIn: () => void }) => {
  const { classes } = useStyles();
  const { token, userId, userEmail } = useGetToken();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const [state, setState] = useState<SessionState>({ status: "loading" });
  const [isSaving, setIsSaving] = useState(false);

  const load = (request: Promise<StoredSession>) => {
    setIsSaving(true);
    request
      .then((session) => setState({ status: "loaded", session }))
      .catch(() => setState({ status: "error" }))
      .finally(() => setIsSaving(false));
  };

  useEffect(() => {
    load(requestAuth<RealSessionStatus>(MOCKED_REAL_SESSION_PATH, { method: "GET" }).then(({ data }) => data.session));
  }, []);

  const captureCurrentSession = () =>
    load(
      requestAuth<RealSessionStatus>(MOCKED_REAL_SESSION_PATH, {
        body: { token, user_id: userId, user_email: userEmail }
      }).then(({ data }) => data.session)
    );

  const forgetSession = () => load(requestAuth(MOCKED_REAL_SESSION_PATH, { method: "DELETE" }).then(() => null));

  // Signing out lands on the login page by itself; signed out already, go there.
  const signInForReal = () => {
    onChooseRealSignIn();

    if (token) {
      signOut();
    } else {
      navigate(LOGIN);
    }
  };

  const renderRow = (value: ReactNode, actions?: ReactNode) => (
    <Box className={classes.sessionRow}>
      <Typography variant="overline" lineHeight={1.5} className={classes.sessionLabel}>
        Real session:
      </Typography>
      {value}
      {actions && <Box className={classes.sessionActions}>{actions}</Box>}
    </Box>
  );

  if (state.status === "loading") {
    return renderRow(
      <Typography variant="caption" className={classes.hint}>
        Asking the dev server…
      </Typography>
    );
  }

  if (state.status === "error") {
    return renderRow(
      <Typography variant="caption" color="error" data-test-id="p_dev_real_session_error">
        No answer — is the mocked API on?
      </Typography>
    );
  }

  const { session } = state;
  const isSignedInForReal = Boolean(token) && token !== TOKEN_BODY.token;
  const isCurrentSessionStored = isSignedInForReal && session?.user_id === userId;

  const details = session
    ? `Mocked sign-ins hand out ${session.user_email}'s real token (captured ${formatCapturedAt(session.captured_at)}), so real API calls work after them.`
    : "A mocked sign-in issues a token no backend accepts, so real API calls answer 401. Sign in for real, then capture the session here.";

  return renderRow(
    <>
      <Typography variant="body2" noWrap className={classes.sessionValue} data-test-id="p_dev_real_session">
        {session ? session.user_email : "None"}
      </Typography>
      <Tooltip title={details} placement="left">
        <InfoOutlinedIcon fontSize="inherit" className={classes.hint} data-test-id="p_dev_real_session_details" />
      </Tooltip>
    </>,
    <>
      {isSignedInForReal && !isCurrentSessionStored && (
        <Button
          variant="outlined"
          size="small"
          className={classes.sessionAction}
          disabled={isSaving}
          onClick={captureCurrentSession}
          data-test-id="btn_dev_capture_real_session"
        >
          Use this session
        </Button>
      )}
      {session && (
        <Button
          size="small"
          className={classes.sessionAction}
          disabled={isSaving}
          onClick={forgetSession}
          data-test-id="btn_dev_forget_real_session"
        >
          Forget
        </Button>
      )}
      {!isSignedInForReal && !session && (
        <Button
          variant="outlined"
          size="small"
          className={classes.sessionAction}
          onClick={signInForReal}
          data-test-id="btn_dev_sign_in_for_real"
        >
          Real sign-in
        </Button>
      )}
    </>
  );
};

export default RealSessionSection;
