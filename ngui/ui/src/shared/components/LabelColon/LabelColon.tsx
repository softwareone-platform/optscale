import React from "react";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { MPT_SPACING_2 } from "../../../utils/layouts";

interface ILabelProps {
  messageId: string;
  suffix?: string;
}

const LabelColon: React.FC<ILabelProps> = ({ messageId, suffix = ":" }) => (
  <Typography variant="label" component="div" paddingRight={MPT_SPACING_2} marginBottom={0}>
    <FormattedMessage id={messageId} />
    {suffix}
  </Typography>
);

export default LabelColon;
