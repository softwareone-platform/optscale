import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  digit: {
    width: 40,
    height: 52,
    padding: 0,
    textAlign: "center",
    fontSize: theme.typography.h5.fontSize,
    fontFamily: theme.typography.fontFamily,
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: theme.shape.borderRadius,
    outline: "none",
    "&:focus": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`
    },
    "&:disabled": {
      opacity: theme.palette.action.disabledOpacity
    }
  }
}));

export default useStyles;
