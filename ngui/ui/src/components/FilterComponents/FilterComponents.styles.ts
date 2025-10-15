import { makeStyles } from "tss-react/mui";
import { MPT_BRAND_TYPE, MPT_GRAY_3, MPT_SPACING_1 } from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  selectButton: {
    borderColor: MPT_GRAY_3,
    fontSize: "14px",
    textTransform: "none",
    color: MPT_BRAND_TYPE,
    padding: `4px ${MPT_SPACING_1}`,
    ".MuiButton-startIcon > svg": {
      fontSize: "14px"
    }
  },
  hasSelection: {
    color: "white"
  }
}));

export default useStyles;
