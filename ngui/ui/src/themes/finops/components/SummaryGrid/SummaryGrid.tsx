import { ComponentProps } from "react";
import { Box } from "@mui/material";
import SummaryGridBase from "@main/components/SummaryGrid/SummaryGrid";
import useStyles from "./SummaryGrid.styles";

type SummaryGridBaseProps = ComponentProps<typeof SummaryGridBase>;

const SummaryGrid = (props: SummaryGridBaseProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.summaryGridWrapper}>
      <SummaryGridBase {...props} />
    </Box>
  );
};

export default SummaryGrid;
