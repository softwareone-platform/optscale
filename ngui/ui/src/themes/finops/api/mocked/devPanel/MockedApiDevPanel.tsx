import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { createToken, CREATE_TOKEN_STATUS, LoginChallenge } from "@theme/api/auth/signIn";
import { isSignInScenario, SIGN_IN_SCENARIO, SIGN_IN_SCENARIO_DESCRIPTION } from "@theme/api/mocked/auth/signIn/scenarios";
import { DEV_PANEL_COLLAPSED_STORAGE_KEY, MOCK_SIGN_IN_CREDENTIALS } from "@theme/api/mocked/config";
import { readSignInScenarioCookie, writeSignInScenarioCookie } from "@theme/api/mocked/http/signInScenarioCookie";
import { useMfaChallengeStage } from "@theme/components/MfaChallengeStep";
import { useLoginChallenge, useMfaTerminalFailure, useStartLoginChallenge } from "@theme/hooks/useLoginChallenge";
import { getLoginUrl, MFA_CHALLENGE } from "@theme/urls";
import { describeMfaChallengeStage, describeRoute } from "./describeStage";
import useStyles from "./MockedApiDevPanel.styles";

// Developer tooling that never reaches a production build, so its copy is deliberately not translated.

const SCENARIO_SELECT_ID = "mocked_api_dev_panel_scenario";

const PanelSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <Stack spacing={0.5}>
    <Typography variant="overline" lineHeight={1.5}>
      {title}
    </Typography>
    {children}
  </Stack>
);

const ChallengeDetails = ({ challenge }: { challenge: LoginChallenge }) => {
  const { classes } = useStyles();

  const rows: [string, string][] = [
    ["state", challenge.state],
    ["challenge_id", challenge.challenge_id],
    ["default_method_id", String(challenge.default_method_id)],
    ["code_sent", String(challenge.code_sent)],
    ["attempts_left", String(challenge.attempts_left)],
    ["expires_at", new Date(challenge.expires_at * 1000).toLocaleTimeString()],
    ...challenge.methods.map(({ id, type, is_default, confirmed }): [string, string] => [
      `method ${type}`,
      `${id.slice(0, 8)}… ${confirmed ? "confirmed" : "PENDING"}${is_default ? " · default" : ""}`
    ])
  ];

  return (
    <Box component="dl" className={classes.details} data-test-id="dl_dev_challenge">
      {rows.map(([term, value]) => (
        <Box key={term} display="contents">
          <dt>{term}</dt>
          <dd>{value}</dd>
        </Box>
      ))}
    </Box>
  );
};

const MockedApiDevPanel = () => {
  const { classes } = useStyles();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const challenge = useLoginChallenge();
  const startLoginChallenge = useStartLoginChallenge();
  const mfaStage = useMfaChallengeStage();
  const terminalFailure = useMfaTerminalFailure();

  // The screen tells the visitor sign-in stopped; the exact reason is only for whoever is testing.
  useEffect(() => {
    if (terminalFailure) {
      console.info(`[mocked-api] login challenge ended: ${terminalFailure.reason}`);
    }
  }, [terminalFailure]);

  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem(DEV_PANEL_COLLAPSED_STORAGE_KEY) === "true");
  const [scenario, setScenario] = useState(() => readSignInScenarioCookie(document.cookie));
  const [isRerunning, setIsRerunning] = useState(false);

  const toggleCollapsed = () => {
    localStorage.setItem(DEV_PANEL_COLLAPSED_STORAGE_KEY, String(!isCollapsed));
    setIsCollapsed(!isCollapsed);
  };

  const selectScenario = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (isSignInScenario(value)) {
      writeSignInScenarioCookie(value);
      setScenario(value);
    }
  };

  const rerunSignIn = async (email: string) => {
    const loginUrl = getLoginUrl(email);

    setIsRerunning(true);

    try {
      const { status, data } = await createToken({ email, password: MOCK_SIGN_IN_CREDENTIALS.password });

      if (status === CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED) {
        startLoginChallenge(data, { replace: true });
        return;
      }

      // A token or an error is the login page's to handle, so those scenarios continue from there.
      navigate(loginUrl, { replace: true });
    } catch {
      navigate(loginUrl, { replace: true });
    } finally {
      setIsRerunning(false);
    }
  };

  return (
    <Paper className={classes.panel} elevation={8} data-test-id="mocked_api_dev_panel">
      <Box className={classes.header} onClick={toggleCollapsed} data-test-id="btn_toggle_dev_panel">
        <Typography variant="subtitle2">Mocked API · dev only</Typography>
        {isCollapsed ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
      </Box>
      {!isCollapsed && (
        <Stack spacing={2} className={classes.body}>
          <PanelSection title="Test credentials">
            <Typography variant="body2" data-test-id="p_dev_credentials_email">
              Email: <span className={classes.code}>{MOCK_SIGN_IN_CREDENTIALS.email}</span> (any valid address)
            </Typography>
            <Typography variant="body2" data-test-id="p_dev_credentials_password">
              Password: <span className={classes.code}>{MOCK_SIGN_IN_CREDENTIALS.password}</span> (anything else → 403 OA0037)
            </Typography>
            <Typography variant="body2" data-test-id="p_dev_credentials_mfa_code">
              MFA code: <span className={classes.code}>{MOCK_SIGN_IN_CREDENTIALS.mfaCode}</span> (anything else is a wrong code)
            </Typography>
          </PanelSection>
          <PanelSection title="Sign-in scenario">
            <TextField
              id={SCENARIO_SELECT_ID}
              select
              size="small"
              fullWidth
              value={scenario}
              onChange={selectScenario}
              SelectProps={{ native: true }}
            >
              {Object.values(SIGN_IN_SCENARIO).map((scenarioOption) => (
                <option key={scenarioOption} value={scenarioOption}>
                  {scenarioOption}
                </option>
              ))}
            </TextField>
            <Typography variant="caption" data-test-id="p_dev_scenario_description">
              {SIGN_IN_SCENARIO_DESCRIPTION[scenario]}
            </Typography>
            {challenge ? (
              <Button
                variant="outlined"
                size="small"
                disabled={isRerunning}
                onClick={() => rerunSignIn(challenge.user_email)}
                data-test-id="btn_dev_rerun_sign_in"
              >
                Re-run sign-in with this scenario
              </Button>
            ) : (
              <Typography variant="caption" className={classes.hint}>
                Applies to the next sign-in.
              </Typography>
            )}
          </PanelSection>
          <PanelSection title="Current stage">
            <Typography variant="body2" data-test-id="p_dev_route">
              {describeRoute(pathname)}
            </Typography>
            {pathname === MFA_CHALLENGE && mfaStage && (
              <Typography variant="body2" fontWeight="bold" data-test-id="p_dev_mfa_stage">
                {describeMfaChallengeStage(mfaStage)}
              </Typography>
            )}
            {challenge && <ChallengeDetails challenge={challenge} />}
          </PanelSection>
        </Stack>
      )}
    </Paper>
  );
};

export default MockedApiDevPanel;
