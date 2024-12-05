import { lighten } from "@mui/system";
import { makeStyles } from "tss-react/mui";
import { SPACING_2 } from "utils/layouts";
import { MPT_BOX_SHADOW, MPT_SPACING_1, MPT_SPACING_2, MPT_SPACING_3 } from "../../../utils/layouts";

const ALPHA = 0.95;
const useStyles = makeStyles()((theme, color) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",    
    border: !!color ? `2px solid ${theme.palette[color].secondary}` : '',    
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
