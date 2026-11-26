import { lighten } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  chip: {
    backgroundColor: lighten(theme.palette.info.main, 0.9),
    color: theme.palette.info.main,
  },
}));

export default useStyles;
