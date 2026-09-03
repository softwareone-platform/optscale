import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { EVariantOptions } from "../../models/EVariantOptions";

interface ILabelProps {
  messageId: string;
  variant?: EVariantOptions;
  suffix?: string | false;
  noWrap?: boolean;
}

const LabelColon: React.FC<ILabelProps> = ({ messageId, suffix = ":", variant = EVariantOptions.BODY2, noWrap = false }) => (
  <Typography
    variant={variant as TypographyProps["variant"]}
    component="div"
    noWrap={noWrap}
    marginBottom={0}
    style={{ overflow: "visible", fontWeight: "bold" }}
  >
    <FormattedMessage id={messageId} />
    {suffix}
  </Typography>
);

export default LabelColon;
