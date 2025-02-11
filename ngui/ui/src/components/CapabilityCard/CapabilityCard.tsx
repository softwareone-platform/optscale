import { useRef } from "react";
import { Box, Typography, Paper, lighten, FormControlLabel } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Checkbox from "components/Checkbox";
import ContentBackdropLoader from "components/ContentBackdropLoader";

type CapabilityCardProps = {
  capability: "mlops" | "finops";
  checked?: boolean;
  onChange: (checked: boolean) => void;
  isLoading?: boolean;
  disabled?: boolean;
  typographyVariant?: "body1" | "body2" | "subtitle1" | "subtitle2" | "caption" | "overline";
  sx?: Record<string, unknown>;
};

type FeatureListProps = {
  messageIds: string[];
  variant?: "body1" | "body2" | "subtitle1" | "subtitle2" | "caption" | "overline";
};

const FeatureList = ({ messageIds, variant = "body1" }: FeatureListProps) => (
  <ul style={{ margin: 0, paddingLeft: "1rem", listStyleType: "'-  '" }}>
    {messageIds.map((messageId) => (
      <li key={messageId}>
        <Typography variant={variant}>
          <FormattedMessage id={messageId} />
        </Typography>
      </li>
    ))}
  </ul>
);

const capabilityMessages = {
  mlops: [
    "capability.mlops.1",
    "capability.mlops.2",
    "capability.mlops.3",
    "capability.mlops.4",
    "capability.mlops.5",
    "capability.mlops.6"
  ],
  finops: [
    "capability.finops.1",
    "capability.finops.2",
    "capability.finops.3",
    "capability.finops.4",
    "capability.finops.5",
    "capability.finops.6"
  ]
};

const capabilityName = {
  mlops: "mlops",
  finops: "finops"
};

const CapabilityCard = ({
  capability,
  onChange,
  checked = false,
  isLoading = false,
  disabled = false,
  typographyVariant = "body2",
  sx
}: CapabilityCardProps) => {
  const clickTimeRef = useRef<number>(0);

  return (
    <Paper
      elevation={0}
      sx={{
        border: (theme) => `1px solid ${lighten(theme.palette.info.main, 0.8)}`,
        "&:hover": {
          backgroundColor: (theme) => theme.palette.action.hover
        },
        ...sx
      }}
    >
      <ContentBackdropLoader isLoading={isLoading}>
        <Box
          sx={{
            padding: "1rem",
            width: "100%",
            height: "100%",
            cursor: disabled ? "default" : "pointer"
          }}
          onMouseDown={() => {
            clickTimeRef.current = Date.now();
          }}
          onMouseUp={() => {
            const timeDiff = Date.now() - clickTimeRef.current;

            const textSelection = window.getSelection()?.toString();

            if (timeDiff < 150) {
              onChange(!checked);
            } else {
              if (textSelection) {
                return;
              }
              onChange(!checked);
            }
          }}
        >
          <FormControlLabel
            sx={{
              pointerEvents: "none"
            }}
            control={<Checkbox checked={checked} disabled={disabled} onChange={(_, checked) => onChange(checked)} />}
            label={
              <Typography variant={typographyVariant}>
                <FormattedMessage id={capabilityName[capability]} />
              </Typography>
            }
          />
          <Box>
            <FeatureList messageIds={capabilityMessages[capability]} variant={typographyVariant} />
          </Box>
        </Box>
      </ContentBackdropLoader>
    </Paper>
  );
};

export default CapabilityCard;
