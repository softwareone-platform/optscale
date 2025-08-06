import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  button: {
    textTransform: "none"
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  },
  activeButton: {
    backgroundColor: theme.palette.secondary.main,
    ".MuiTypography-root": {
      color: theme.palette.primary.white
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  disabled: {
    border: "1px solid rgba(0,0,0,0.12)",
    color: "rgba(0,0,0,0.26)",
    cursor: "default",
    "&:hover": {
      backgroundColor: "inherit"
    }
  }
}));

export default useStyles;
