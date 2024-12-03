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
      borderRadius: 0,
      paddingRight: 0,
      "> :first-child": {
        marginLeft: "-10px"
      },
      "> :nth-last-child(2)": {
        marginRight: "-10px"
      }
    },
    ".MuiBadge-root > svg": {
      fill: "black"
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none"
    },
    ".MuiInputBase-input": {
      fontSize: "14px",
      borderTop: "none"
    },
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(1)
    }
  }
}));

export default useStyles;
