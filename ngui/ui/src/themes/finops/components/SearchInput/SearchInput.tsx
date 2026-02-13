import { ComponentProps } from "react";
import { Box } from "@mui/material";
import SearchInputBase from "@main/components/SearchInput/SearchInput";
import useStyles from "./SearchInputOverride.styles";

type SearchInputProps = ComponentProps<typeof SearchInputBase>;

const SearchInput = (props: SearchInputProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.searchInputWrapper}>
      <SearchInputBase {...props} />
    </Box>
  );
};

export default SearchInput;
