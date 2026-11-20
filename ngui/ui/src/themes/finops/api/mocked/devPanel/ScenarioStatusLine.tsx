import Typography from "@mui/material/Typography";
import { SCENARIO_STATUS, ScenarioStatusInfo } from "@theme/api/mocked/scenarioStatus";

type ScenarioStatusLineProps = {
  info: ScenarioStatusInfo;
  dataTestId: string;
};

/** Says only what is not built yet — a ready scenario needs no line. */
const ScenarioStatusLine = ({ info, dataTestId }: ScenarioStatusLineProps) =>
  info.status === SCENARIO_STATUS.IN_PROGRESS ? (
    <Typography variant="caption" fontWeight="medium" color="warning.main" data-test-id={dataTestId}>
      In progress — {info.note}
    </Typography>
  ) : null;

export default ScenarioStatusLine;
