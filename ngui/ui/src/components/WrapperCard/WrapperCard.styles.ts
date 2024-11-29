import { makeStyles } from "tss-react/mui";
import { KU_BOX_SHADOW, KU_SPACING_2, KU_SPACING_3 } from "../../utils/layouts";

const useStyles = makeStyles()((theme) => ({
  spacer: {
    flexGrow: 1
  },
  actions: {
    borderTop: "1px solid lightGrey",
    height: "2.5rem"
  },
  content: {
    paddingTop: theme.spacing(1)
  },
  card: {
    padding: KU_SPACING_3
  },
  shadow: {
    borderRadius: KU_SPACING_2,
    boxShadow: KU_BOX_SHADOW
  },
  buttonLink: {
    "&:hover": {
      textDecoration: "none"
    }
  },
  halfWidth: {
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  },
  quarterWidth: {
    [theme.breakpoints.up("md")]: {
      width: "25%"
    }
  },
  alignedWrapper: {
    height: "100%"
  }
}));

export default useStyles;
