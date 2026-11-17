import { makeStyles } from "tss-react/mui";
import { MPT_BOX_SHADOW, MPT_BRAND_WHITE, MPT_GRAY_2, MPT_SPACING_2, MPT_SPACING_3 } from "@theme/utils/layouts";

const useStyles = makeStyles()(() => ({
  grid: {
    "> div": {
      padding: MPT_SPACING_3,
      borderRight: `1px solid ${MPT_GRAY_2}`
    },
    "&:nth-of-type(3n) > div": {
      borderRight: "none"
    }
  },
  gridBox: {
    "> div": {
      backgroundColor: MPT_BRAND_WHITE,
      borderRadius: MPT_SPACING_2,
      boxShadow: MPT_BOX_SHADOW,
      padding: MPT_SPACING_3
    }
  }
}));

export default useStyles;
