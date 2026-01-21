import { ComponentProps } from "react";
import { Box } from "@mui/material";
import SearchInputOriginal from "@main/components/SearchInput/SearchInput";
import useStyles from "./SearchInputOverride.styles";

type SearchInputProps = ComponentProps<typeof SearchInputOriginal>;

const SearchInput = (props: SearchInputProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.searchInputWrapper}>
      <SearchInputOriginal {...props} />
    </Box>
  );
};

export default SearchInput;
