import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  actionsWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    flexGrow: 1,
    maxWidth: "100%",
    "& > *": {
      "&:not(:last-child)": {
        marginRight: theme.spacing(1)
      }
    },
    ".MuiOutlinedInput-root": {
      boxShadow: " inset 0 0 5px rgba(0, 0, 0, 0.2)"
    },
    ".MuiOutlinedInput-root svg": {
      fill: "black"
    },
    ".MuiBadge-root > svg": {
      fill: "black"
    },
    ".MuiOutlinedInput-notchedOutline": {},
    ".MuiInputBase-input": {
      fontSize: "14px"
    },
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(1)
    }
  }
}));

export default useStyles;
