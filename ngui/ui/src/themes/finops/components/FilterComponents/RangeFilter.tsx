import { ComponentProps } from "react";
import { Box } from "@mui/material";
import RangeFilterOriginal from "@main/components/FilterComponents/RangeFilter";
import useStyles from "./FilterComponents.styles";

type RangeFilterProps = ComponentProps<typeof RangeFilterOriginal>;

const RangeFilter = (props: RangeFilterProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.filterWrapper}>
      <RangeFilterOriginal {...props} />
    </Box>
  );
};

export default RangeFilter;
