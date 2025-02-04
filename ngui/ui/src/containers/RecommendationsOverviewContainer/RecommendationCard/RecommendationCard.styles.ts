import { makeStyles } from "tss-react/mui";
import { MPT_BOX_SHADOW, MPT_SPACING_1, MPT_SPACING_2, MPT_SPACING_3 } from "../../../utils/layouts";

const useStyles = makeStyles()(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: MPT_BOX_SHADOW
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: MPT_SPACING_3
  },
  description: {
    marginBottom: MPT_SPACING_2
  },
  actions: {
    justifyContent: "space-between",
    paddingLeft: MPT_SPACING_3,
    paddingRight: MPT_SPACING_3,
    paddingBottom: MPT_SPACING_1
  }
}));

export default useStyles;
