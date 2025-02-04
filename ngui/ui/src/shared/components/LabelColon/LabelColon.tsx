import React from "react";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

interface ILabelProps {
  messageId: string;
  suffix?: string;
  noWrap?: boolean;
}

const LabelColon: React.FC<ILabelProps> = ({ messageId, suffix = ":", noWrap = false }) => (
  <Typography variant="label" component="div" noWrap={noWrap} marginBottom={0}>
    <FormattedMessage id={messageId} />
    {suffix}
  </Typography>
);

export default LabelColon;
