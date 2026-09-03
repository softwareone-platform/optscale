import { makeStyles } from "tss-react/mui";
import { MPT_GRAY_2, SPACING_3, SPACING_5 } from "../../utils/layouts";

const useStyles = makeStyles()((theme) => ({
  bar: {
    backgroundColor: "white",
    color: "inherit",
    boxShadow: "none"
  },
  isPage: {
    paddingRight: theme.spacing(SPACING_5),
    paddingLeft: theme.spacing(SPACING_3),
    paddingTop: "5px",
    paddingBottom: "5px",
    borderBottom: `1px solid ${MPT_GRAY_2}`
  },
  itemsWrapper: {
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center"
  },
  margin: {
    "& > *": {
      marginRight: theme.spacing(2),
      "&:last-child": {
        marginRight: 0
      }
    }
  },
  actions: {
    display: "inline-flex"
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    },
    color: "inherit"
  }
}));

export default useStyles;
