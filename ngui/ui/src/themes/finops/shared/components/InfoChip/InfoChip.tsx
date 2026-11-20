import Chip, { ChipProps } from "@mui/material/Chip";
import { makeStyles } from "tss-react/mui";
import { MPT_ALERTS_INFO_1, MPT_BRAND_PRIMARY } from "@theme/utils/layouts";

const useStyles = makeStyles()(() => ({
  chip: {
    backgroundColor: MPT_ALERTS_INFO_1,
    color: MPT_BRAND_PRIMARY
  }
}));

/** A small label in the brand's info colours — "Default", "Already set up". */
const InfoChip = ({ className, ...props }: Omit<ChipProps, "size" | "color">) => {
  const { classes, cx } = useStyles();

  return <Chip size="small" className={cx(classes.chip, className)} {...props} />;
};

export default InfoChip;
