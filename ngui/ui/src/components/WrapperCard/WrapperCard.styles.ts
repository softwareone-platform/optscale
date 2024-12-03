import { makeStyles } from "tss-react/mui";
import { MPT_BOX_SHADOW, MPT_SPACING_2, MPT_SPACING_3 } from "../../utils/layouts";

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
    padding: MPT_SPACING_3
  },
  shadow: {
    borderRadius: MPT_SPACING_2,
    boxShadow: MPT_BOX_SHADOW
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
