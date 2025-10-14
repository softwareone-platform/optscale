import { makeStyles } from "tss-react/mui";
import { MPT_BOX_SHADOW, MPT_SPACING_1, MPT_SPACING_2, MPT_SPACING_3 } from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  customBox: {
    margin: 0,
    marginBottom: MPT_SPACING_2,
    ".MuiPaper-rounded": {
      borderRadius: MPT_SPACING_1,
      textAlign: "left",
      padding: MPT_SPACING_1,
      paddingLeft: 0,
      paddingRight: 0,
      boxShadow: MPT_BOX_SHADOW,
      border: "none",
      ".MuiTypography-h5": {
        marginTop: "5px",
        fontSize: MPT_SPACING_3,
        lineHeight: "28px"
      }
    }
  }
}));

export default useStyles;
