import Chip, { ChipProps } from "@mui/material/Chip";
import useStyles from "./InfoChip.styles";

/** A small label in the info colours — "Default", "Already set up". */
const InfoChip = ({ className, ...props }: Omit<ChipProps, "size" | "color">) => {
  const { classes, cx } = useStyles();

  return <Chip size="small" className={cx(classes.chip, className)} {...props} />;
};

export default InfoChip;
