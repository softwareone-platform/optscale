import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  setupIntro: {
    textAlign: "center"
  },
  secretKey: {
    fontFamily: "monospace",
    letterSpacing: "0.1em",
    color: theme.palette.primary.main,
    padding: theme.spacing(1, 2),
    border: `1px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    wordBreak: "break-all"
  }
}));

export default useStyles;
