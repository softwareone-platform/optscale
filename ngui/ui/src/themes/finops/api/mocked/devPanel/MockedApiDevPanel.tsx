import { ChangeEvent, ReactNode, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { createToken, CREATE_TOKEN_STATUS } from "@theme/api/auth/signIn";
import { isSignInScenario, SIGN_IN_SCENARIO_GROUPS, SIGN_IN_SCENARIO_INFO } from "@theme/api/mocked/auth/signIn/scenarios";
import { DEV_PANEL_COLLAPSED_STORAGE_KEY, MOCK_SIGN_IN_CREDENTIALS } from "@theme/api/mocked/config";
import { readSignInScenarioCookie, writeSignInScenarioCookie } from "@theme/api/mocked/http/signInScenarioCookie";
import { useLoginChallenge, useStartLoginChallenge } from "@theme/hooks/useLoginChallenge";
import { getLoginUrl } from "@theme/urls";
import CopyText from "components/CopyText";
import useStyles from "./MockedApiDevPanel.styles";

// Developer tooling that never reaches a production build, so its copy is deliberately not translated.

const SCENARIO_SELECT_ID = "mocked_api_dev_panel_scenario";

const TEST_CREDENTIALS = [
  { id: "email", label: "Email", value: MOCK_SIGN_IN_CREDENTIALS.email, hint: "Any valid address works" },
  { id: "password", label: "Password", value: MOCK_SIGN_IN_CREDENTIALS.password, hint: "Anything else → 403 OA0037" },
  { id: "mfa_code", label: "MFA code", value: MOCK_SIGN_IN_CREDENTIALS.mfaCode, hint: "Anything else is a wrong code" }
] as const;

const CredentialRow = ({ id, label, value, hint }: (typeof TEST_CREDENTIALS)[number]) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.credential} data-test-id={`p_dev_credentials_${id}`}>
      <Typography variant="body2" className={classes.credentialLabel}>
        {label}
      </Typography>
      <CopyText text={value} variant="body2" dataTestIds={{ button: `btn_dev_copy_${id}` }}>
        <span className={classes.code}>{value}</span>
      </CopyText>
      <Typography variant="caption" className={classes.credentialHint}>
        {hint}
      </Typography>
    </Box>
  );
};

const PanelSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <Stack spacing={0.5}>
    <Typography variant="overline" lineHeight={1.5}>
      {title}
    </Typography>
    {children}
  </Stack>
);

const MockedApiDevPanel = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const challenge = useLoginChallenge();
  const startLoginChallenge = useStartLoginChallenge();

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
            <Stack spacing={1}>
              {TEST_CREDENTIALS.map((credential) => (
                <CredentialRow key={credential.id} {...credential} />
              ))}
            </Stack>
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
              {SIGN_IN_SCENARIO_GROUPS.map(({ label, scenarios }) => (
                <optgroup key={label} label={label}>
                  {scenarios.map((scenarioOption) => (
                    <option key={scenarioOption} value={scenarioOption}>
                      {SIGN_IN_SCENARIO_INFO[scenarioOption].label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </TextField>
            <Typography variant="caption" data-test-id="p_dev_scenario_description">
              {SIGN_IN_SCENARIO_INFO[scenario].description}
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
        </Stack>
      )}
    </Paper>
  );
};

export default MockedApiDevPanel;
