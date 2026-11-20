import { makeStyles } from "tss-react/mui";
import { MPT_GRAY_1, MPT_SPACING_3 } from "@theme/utils/layouts";

const useStyles = makeStyles()(() => ({
  instructions: {
    backgroundColor: MPT_GRAY_1,
    padding: MPT_SPACING_3
  }
}));

export default useStyles;
