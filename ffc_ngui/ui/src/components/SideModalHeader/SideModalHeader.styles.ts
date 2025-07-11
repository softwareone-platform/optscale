import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  title: {
    flexGrow: 1,
    display: "flex",
    alignContent: "center",
    color: theme.palette.primary.white
  },
  headerPrimary: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.gradient
  },
  headerSuccess: {
    color: theme.palette.success.contrastText,
    backgroundColor: theme.palette.success.main
  },
  headerInfo: {
    color: theme.palette.info.dark,
    backgroundColor: theme.palette.info.light
  },
  headerError: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main
  }
}));

export default useStyles;
