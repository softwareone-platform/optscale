import { makeStyles } from "tss-react/mui";
import { MPT_BOX_SHADOW, MPT_SPACING_1, MPT_SPACING_2, MPT_TERTIARY_BLUE_1 } from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  customBox: {
    margin: 0,
    marginBottom: MPT_SPACING_2,
    ".MuiPaper-rounded": {
      borderRadius: MPT_SPACING_2,
      textAlign: "left",
      padding: MPT_SPACING_1,
      background: MPT_TERTIARY_BLUE_1,
      boxShadow: MPT_BOX_SHADOW,
      border: "none"
    },
    ".MuiBox-root": {
      color: "black"
    }
  }
}));

export default useStyles;
