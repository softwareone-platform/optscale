import React from "react";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

interface ILabelProps {
  messageId: string;
  suffix?: string;
}

const LabelColon: React.FC<ILabelProps> = ({ messageId, suffix = ":" }) => (
  <Typography variant="label" component="div" marginBottom={0}>
    <FormattedMessage id={messageId} />
    {suffix}
  </Typography>
);

export default LabelColon;
