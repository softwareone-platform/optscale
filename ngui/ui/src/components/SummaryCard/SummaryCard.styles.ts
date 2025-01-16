import { lighten } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { SPACING_1, SPACING_2, SPACING_3, MPT_BOX_SHADOW_HOVER, MPT_SPACING_3, MPT_SPACING_4 } from "utils/layouts";

const ALPHA = 0.95;

const useStyles = makeStyles()((theme, color) => ({
  root: {
    minWidth: 150,
    minHeight: 60,
    height: "100%",
    padding: 0,
    [theme.breakpoints.down("xl")]: {
      minWidth: 100
    },
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
  },
  contentWithIcon: {
    paddingRight: MPT_SPACING_4
  },
  icon: {
    fontSize: "18px"
  }
}));

export default useStyles;
