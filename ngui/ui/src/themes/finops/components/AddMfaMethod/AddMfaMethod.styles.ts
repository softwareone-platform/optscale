import { makeStyles } from "tss-react/mui";
import { MPT_BRAND_PRIMARY, MPT_SPACING_1, MPT_SPACING_2 } from "@theme/utils/layouts";

const useStyles = makeStyles()(() => ({
  setupIntro: {
    textAlign: "center"
  },
  secretKey: {
    fontFamily: "monospace",
    letterSpacing: "0.1em",
    color: MPT_BRAND_PRIMARY,
    padding: `${MPT_SPACING_1} ${MPT_SPACING_2}`,
    border: `1px dashed ${MPT_BRAND_PRIMARY}`,
    borderRadius: MPT_SPACING_1,
    wordBreak: "break-all"
  }
}));

export default useStyles;
