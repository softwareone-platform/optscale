import { makeStyles } from "tss-react/mui";
import { MPT_GRAY_2, MPT_SPACING_3 } from "utils/layouts";

const useStyles = makeStyles()(() => ({
  grid: {
    "> div": {
      padding: MPT_SPACING_3,
      borderRight: `1px solid ${MPT_GRAY_2}`
    },
    "&:nth-child(3n) > div": {
      borderRight: "none"
    }
  }
}));

export default useStyles;
