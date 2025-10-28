import { makeStyles } from "tss-react/mui";
import { MPT_SPACING_3 } from "utils/layouts";

const useStyles = makeStyles()(() => ({
  page: {
    padding: MPT_SPACING_3,
    display: "flex",
    paddingTop: MPT_SPACING_3
  }
}));

export default useStyles;
