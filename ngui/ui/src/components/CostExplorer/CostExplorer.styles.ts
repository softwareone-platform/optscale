import { makeStyles } from "tss-react/mui";
import { MPT_GRAY_2, MPT_SPACING_1 } from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  costExplorerSubMenu: {
    display: "block",
    width: "100%",
    marginTop: MPT_SPACING_1,
    button: {
      display: "flex",
      width: "100%",
      borderRadius: 0,
      padding: MPT_SPACING_1,
      fontSize: "14px",
      ".MuiButton-endIcon": {
        marginLeft: "auto"
      }
    },
    "a:not(:last-of-type) button": {
      borderBottom: `1px solid ${MPT_GRAY_2}`
    }
  }
}));

export default useStyles;
