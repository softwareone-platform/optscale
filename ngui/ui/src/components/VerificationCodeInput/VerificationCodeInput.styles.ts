import { alpha } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

// The outline MUI gives an outlined text field, so the boxes match the sign-in forms' inputs.
const useStyles = makeStyles()((theme) => ({
  digit: {
    width: 40,
    height: 52,
    padding: 0,
    textAlign: "center",
    fontSize: theme.typography.h5.fontSize,
    fontFamily: theme.typography.fontFamily,
    border: `1px solid ${alpha(theme.palette.common.black, 0.23)}`,
    borderRadius: theme.shape.borderRadius,
    outline: "none",
    "&:focus": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
    },
    "&:disabled": {
      opacity: theme.palette.action.disabledOpacity,
    },
  },
}));

export default useStyles;
