import { FormControlLabel, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { FormattedMessage } from "react-intl";

interface ChartLegendToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ChartLegendToggle = ({ checked, onChange }: ChartLegendToggleProps) => (
  <FormControlLabel
    control={<Switch onChange={(e) => onChange(e.target.checked)} checked={checked} />}
    label={
      <Typography>
        <FormattedMessage id="showLegend" />
      </Typography>
    }
    labelPlacement="start"
  />
);

export default ChartLegendToggle;
