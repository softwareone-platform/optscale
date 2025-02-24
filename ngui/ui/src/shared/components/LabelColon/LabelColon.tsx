import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { EVariantOptions } from "../../models/EVariantOptions";

interface ILabelProps {
  messageId: string;
  variant?: EVariantOptions;
  suffix?: string;
  noWrap?: boolean;
}

const LabelColon: React.FC<ILabelProps> = ({ messageId, suffix = ":", variant = EVariantOptions.LABEL, noWrap = false }) => (
  <Typography variant={variant as TypographyProps["variant"]} component="div" noWrap={noWrap} marginBottom={0}>
    <FormattedMessage id={messageId} />
    {suffix}
  </Typography>
);

export default LabelColon;
