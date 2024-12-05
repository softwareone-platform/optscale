import { lighten } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { SPACING_1, SPACING_2, SPACING_3, MPT_BOX_SHADOW_HOVER } from "utils/layouts";

const ALPHA = 0.95;
const ALPHA_HOVER = 0.8;

const useStyles = makeStyles()((theme, color) => ({
  root: {
    minWidth: 150,
    minHeight: 60,
    height: "100%",
    padding: 0,
    [theme.breakpoints.down("xl")]: {
      minWidth: 100
    },
    backgroundColor: lighten(color, ALPHA),
    border: "1px solid ${lighten(color, ALPHA)}",
    color
  },
  button: {
    transition: "background-color 0.3s ease-in",
    cursor: "pointer",
    paddingRight: theme.spacing(SPACING_3),
    "&:hover": {
      boxShadow: MPT_BOX_SHADOW_HOVER

    }
  },
  content: {
    paddingTop: theme.spacing(SPACING_1),
    paddingLeft: theme.spacing(SPACING_2),
    display: "flex",
    height: "100%",
    flexDirection: "column",
    "&:last-child": {
      paddingBottom: theme.spacing(SPACING_1)
    }
  }
}));

export default useStyles;
