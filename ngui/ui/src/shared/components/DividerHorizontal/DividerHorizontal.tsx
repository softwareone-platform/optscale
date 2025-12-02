import React from "react";
import Divider from "@mui/material/Divider";
import { MPT_SPACING_1, MPT_SPACING_2, MPT_SPACING_3, MPT_SPACING_4, MPT_SPACING_5 } from "../../../utils/layouts";

type HorizontalDividerProps = {
  verticalSpacing?:
    | typeof MPT_SPACING_1
    | typeof MPT_SPACING_2
    | typeof MPT_SPACING_3
    | typeof MPT_SPACING_4
    | typeof MPT_SPACING_5
    | "0px";
  noHorizontalSpacing?: boolean;
};

const HorizontalDivider: React.FC<HorizontalDividerProps> = ({
  verticalSpacing = MPT_SPACING_1,
  noHorizontalSpacing = false
}) => {
  const horizontalSpacing = noHorizontalSpacing ? "0px" : MPT_SPACING_2;

  return (
    <Divider
      style={{
        margin: verticalSpacing,
        marginLeft: horizontalSpacing,
        marginRight: horizontalSpacing,
        borderTopWidth: "1px"
      }}
      flexItem
      orientation="vertical"
    />
  );
};

export default HorizontalDivider;
