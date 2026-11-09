import { makeStyles } from "tss-react/mui";
import { MPT_BRAND_PRIMARY, MPT_GRAY_4, MPT_SPACING_1 } from "@theme/utils/layouts";

const useStyles = makeStyles()((theme) => ({
  digit: {
    width: 40,
    height: 52,
    padding: 0,
    textAlign: "center",
    fontSize: theme.typography.h5.fontSize,
    fontFamily: theme.typography.fontFamily,
    border: `1px solid ${MPT_GRAY_4}`,
    borderRadius: MPT_SPACING_1,
    outline: "none",
    "&:focus": {
      borderColor: MPT_BRAND_PRIMARY,
      boxShadow: `0 0 0 1px ${MPT_BRAND_PRIMARY}`
    },
    "&:disabled": {
      opacity: theme.palette.action.disabledOpacity
    }
  }
}));

export default useStyles;
