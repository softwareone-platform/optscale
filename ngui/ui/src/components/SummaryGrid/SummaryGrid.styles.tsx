import { makeStyles } from "tss-react/mui";
import { MPT_BOX_SHADOW, MPT_SPACING_1, MPT_SPACING_2 } from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  customBox: {
    margin: 0,
    marginBottom: MPT_SPACING_2,
    ".MuiPaper-rounded": {
      borderRadius: MPT_SPACING_2,
      textAlign: "center",
      padding: MPT_SPACING_1,
      background: "#CAE4FF",
      boxShadow: MPT_BOX_SHADOW
    },
    ".MuiBox-root": {
      justifyContent: "center",
      color: "black"
    }
  }
}));

export default useStyles;
