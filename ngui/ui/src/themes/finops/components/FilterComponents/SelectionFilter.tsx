import { ComponentProps } from "react";
import { Box } from "@mui/material";
import SelectionFilterOriginal from "@main/components/FilterComponents/SelectionFilter";
import useStyles from "./FilterComponents.styles";

type SelectionFilterProps = ComponentProps<typeof SelectionFilterOriginal>;

const SelectionFilter = (props: SelectionFilterProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.filterWrapper}>
      <SelectionFilterOriginal {...props} />
    </Box>
  );
};

export default SelectionFilter;
