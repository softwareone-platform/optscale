import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  keyBox: {
    display: "flex",
    flexWrap: "nowrap",
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    fontWeight: "bold"
  },
  valueBox: {
    whiteSpace: "normal",
    overflowWrap: "anywhere"
  },
  typography: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  }
}));

export default useStyles;
