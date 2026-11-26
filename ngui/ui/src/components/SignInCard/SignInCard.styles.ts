import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  screen: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(6, 3),
  },
  card: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    maxWidth: 548,
    textAlign: "center",
  },
}));

export default useStyles;
