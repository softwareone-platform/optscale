import { ComponentProps } from "react";
import { Box } from "@mui/material";
import SuggestionFilterOriginal from "@main/components/FilterComponents/SuggestionFilter";
import useStyles from "./FilterComponents.styles";

type SuggestionFilterProps = ComponentProps<typeof SuggestionFilterOriginal>;

const SuggestionFilter = (props: SuggestionFilterProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.filterWrapper}>
      <SuggestionFilterOriginal {...props} />
    </Box>
  );
};

export default SuggestionFilter;
