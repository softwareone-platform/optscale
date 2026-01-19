import { makeStyles } from "tss-react/mui";
import { SPACING_1, SPACING_2, SPACING_3, MPT_BOX_SHADOW_HOVER, MPT_SPACING_4 } from "@theme/utils/layouts";

const useStyles = makeStyles()((theme, color) => ({
  root: {
    minWidth: 150,
    minHeight: 60,
    height: "100%",
    padding: 0,
    [theme.breakpoints.down("xl")]: {
      minWidth: 100
    }
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
