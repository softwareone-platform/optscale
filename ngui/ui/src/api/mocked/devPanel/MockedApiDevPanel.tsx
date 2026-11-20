import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { createToken, CREATE_TOKEN_STATUS } from "api/auth/signIn";
import { isSecurityScenario, SECURITY_SCENARIO_INFO, SECURITY_SCENARIO_STATUS } from "api/mocked/auth/mfaMethods/scenarios";
import {
  isSignInScenario,
  SIGN_IN_SCENARIO,
  SIGN_IN_SCENARIO_GROUPS,
  SIGN_IN_SCENARIO_INFO,
  SIGN_IN_SCENARIO_STATUS,
  SignInScenario
} from "api/mocked/auth/signIn/scenarios";
import { DEV_PANEL_COLLAPSED_STORAGE_KEY, MOCK_SIGN_IN_CREDENTIALS } from "api/mocked/config";
import {
  readSecurityScenarioCookie,
  readSignInScenarioCookie,
  writeSecurityScenarioCookie,
  writeSignInScenarioCookie
} from "api/mocked/http/scenarioCookies";
import { getScenarioOptionLabel } from "api/mocked/scenarioStatus";
import CopyText from "components/CopyText";
import { useLoginChallenge, useStartLoginChallenge } from "hooks/useLoginChallenge";
import { getLoginUrl } from "urls";
import { CREDENTIAL_FIELD_SELECTOR, fillFields } from "./fillFields";
import useStyles from "./MockedApiDevPanel.styles";
import RealSessionSection from "./RealSessionSection";
import { getFittingSecurityScenario, SECURITY_SCENARIO_CHOICE } from "./scenarioLinks";
import ScenarioStatusLine from "./ScenarioStatusLine";
import { useIsDialogOpen } from "./useIsDialogOpen";

// Developer tooling that never reaches a production build, so its copy is deliberately not translated.

const SCENARIO_SELECT_ID = "mocked_api_dev_panel_scenario";

const SECURITY_SCENARIO_SELECT_ID = "mocked_api_dev_panel_security_scenario";

const TEST_CREDENTIALS = [
  { id: "email", label: "Email", value: MOCK_SIGN_IN_CREDENTIALS.email, hint: "Any valid address works." },
  { id: "password", label: "Password", value: MOCK_SIGN_IN_CREDENTIALS.password, hint: "Anything else → 403 OA0037." },
  {
    id: "verification_code",
    label: "E-mail code",
    value: MOCK_SIGN_IN_CREDENTIALS.verificationCode,
    hint: "Password recovery and e-mail verification. Anything else → 403 OA0071."
  },
  { id: "mfa_code", label: "MFA code", value: MOCK_SIGN_IN_CREDENTIALS.mfaCode, hint: "Anything else is a wrong code." }
] as const;

const CredentialRow = ({ id, label, value, hint }: (typeof TEST_CREDENTIALS)[number]) => {
  const { classes } = useStyles();
  const [hasNoFieldToFill, setHasNoFieldToFill] = useState(false);

  return (
    <Box className={classes.credential} data-test-id={`p_dev_credentials_${id}`}>
      <Tooltip title={hint} placement="left">
        <Typography variant="body2" className={classes.credentialLabel}>
          {label}
        </Typography>
      </Tooltip>
      <CopyText text={value} variant="body2" dataTestIds={{ button: `btn_dev_copy_${id}` }}>
        <span className={classes.code}>{value}</span>
      </CopyText>
      <Tooltip title={hasNoFieldToFill ? "No field for it on this page" : `Fill in the ${label.toLowerCase()}`}>
        <IconButton
          size="small"
          onClick={() => setHasNoFieldToFill(fillFields(CREDENTIAL_FIELD_SELECTOR[id], value) === 0)}
          onMouseLeave={() => setHasNoFieldToFill(false)}
          data-test-id={`btn_dev_fill_${id}`}
        >
          <InputOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

/** One short line, the TDR's terms in its tooltip. */
const ScenarioDescription = ({
  description,
  details,
  dataTestId
}: {
  description: string;
  details: string;
  dataTestId: string;
}) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.description}>
      <Typography variant="caption" data-test-id={dataTestId}>
        {description}
      </Typography>
      <Tooltip title={details} placement="left">
        <InfoOutlinedIcon fontSize="inherit" className={classes.hint} data-test-id={`${dataTestId}_details`} />
      </Tooltip>
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
  const { classes, cx } = useStyles();
  const isDialogOpen = useIsDialogOpen();

  const navigate = useNavigate();
  const challenge = useLoginChallenge();
  const startLoginChallenge = useStartLoginChallenge();

  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem(DEV_PANEL_COLLAPSED_STORAGE_KEY) === "true");
  const [scenario, setScenario] = useState(() => readSignInScenarioCookie(document.cookie));
  const [securityScenario, setSecurityScenario] = useState(() => readSecurityScenarioCookie(document.cookie));
  const [isRerunning, setIsRerunning] = useState(false);

  const securityChoice = SECURITY_SCENARIO_CHOICE[scenario];

  // A sign-in scenario decides which users reach the Security page, so the picked state follows it.
  useEffect(() => {
    const fitting = getFittingSecurityScenario(scenario, securityScenario);

    if (fitting !== securityScenario) {
      writeSecurityScenarioCookie(fitting);
      setSecurityScenario(fitting);
    }
  }, [scenario, securityScenario]);

  const toggleCollapsed = () => {
    localStorage.setItem(DEV_PANEL_COLLAPSED_STORAGE_KEY, String(!isCollapsed));
    setIsCollapsed(!isCollapsed);
  };

  const pickScenario = (value: SignInScenario) => {
    writeSignInScenarioCookie(value);
    setScenario(value);
  };

  const selectScenario = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (isSignInScenario(value)) {
      pickScenario(value);
    }
  };

  const selectSecurityScenario = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (isSecurityScenario(value)) {
      writeSecurityScenarioCookie(value);
      setSecurityScenario(value);
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
    <Paper
      className={cx(classes.panel, isDialogOpen && classes.aboveDialogs)}
      elevation={8}
      data-test-id="mocked_api_dev_panel"
    >
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
                      {getScenarioOptionLabel(
                        SIGN_IN_SCENARIO_INFO[scenarioOption].label,
                        SIGN_IN_SCENARIO_STATUS[scenarioOption]
                      )}
                    </option>
                  ))}
                </optgroup>
              ))}
            </TextField>
            <ScenarioDescription {...SIGN_IN_SCENARIO_INFO[scenario]} dataTestId="p_dev_scenario_description" />
            <ScenarioStatusLine info={SIGN_IN_SCENARIO_STATUS[scenario]} dataTestId="p_dev_scenario_status" />
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
          <PanelSection title="Security page scenario">
            {"hiddenBecause" in securityChoice ? (
              <Typography variant="caption" className={classes.hint} data-test-id="p_dev_security_scenario_hidden">
                {securityChoice.hiddenBecause}
              </Typography>
            ) : (
              <>
                <TextField
                  id={SECURITY_SCENARIO_SELECT_ID}
                  select
                  size="small"
                  fullWidth
                  value={securityScenario}
                  onChange={selectSecurityScenario}
                  SelectProps={{ native: true }}
                >
                  {securityChoice.scenarios.map((scenarioOption) => (
                    <option key={scenarioOption} value={scenarioOption}>
                      {getScenarioOptionLabel(
                        SECURITY_SCENARIO_INFO[scenarioOption].label,
                        SECURITY_SCENARIO_STATUS[scenarioOption]
                      )}
                    </option>
                  ))}
                </TextField>
                <ScenarioDescription
                  {...SECURITY_SCENARIO_INFO[securityScenario]}
                  dataTestId="p_dev_security_scenario_description"
                />
                <ScenarioStatusLine
                  info={SECURITY_SCENARIO_STATUS[securityScenario]}
                  dataTestId="p_dev_security_scenario_status"
                />
                <Typography variant="caption" className={classes.hint}>
                  Applies from the next page load.
                </Typography>
              </>
            )}
          </PanelSection>
          <RealSessionSection onChooseRealSignIn={() => pickScenario(SIGN_IN_SCENARIO.REAL_SIGN_IN)} />
        </Stack>
      )}
    </Paper>
  );
};

export default MockedApiDevPanel;
