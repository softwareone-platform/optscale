import { lighten } from "@mui/system";
import { makeStyles } from "tss-react/mui";
import { SPACING_2 } from "utils/layouts";
import { MPT_BOX_SHADOW, MPT_SPACING_1, MPT_SPACING_2 } from "../../../utils/layouts";

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
    justifyContent: "space-between"
  },
  description: {
    marginBottom: theme.spacing(SPACING_2)
  },
  actions: {
    justifyContent: "space-between",
    paddingLeft: theme.spacing(SPACING_2),
    paddingRight: theme.spacing(SPACING_2)
  }
}));

export default useStyles;
