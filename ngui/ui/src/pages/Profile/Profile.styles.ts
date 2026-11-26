import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  tabs: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useStyles;
