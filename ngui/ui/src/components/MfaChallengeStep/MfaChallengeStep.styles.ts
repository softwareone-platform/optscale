import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  instructions: {
    backgroundColor: theme.palette.action.hover,
    padding: theme.spacing(3)
  }
}));

export default useStyles;
