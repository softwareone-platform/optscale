import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  copyWrapper: {
    display: "inline-flex",
    paddingLeft: theme.spacing(0.5),
    cursor: "pointer"
  }
}));

export default useStyles;
