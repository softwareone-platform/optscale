import { makeStyles } from "tss-react/mui";
import { MPT_ALERTS_INFO_1, MPT_BRAND_WHITE } from "utils/layouts";

const useStyles = makeStyles()(() => ({
  chip: {
    maxWidth: "100%",
    "&.selectedFilter": {
      border: "none",
      backgroundColor: MPT_ALERTS_INFO_1,
      borderRadius: "8px"
    }
  },
  uppercase: {
    textTransform: "uppercase"
  },
  // https://mui.com/material-ui/react-chip/#multiline-chip
  multiline: {
    height: "auto",
    "& .MuiChip-label": {
      display: "block",
      whiteSpace: "normal",
      color: MPT_BRAND_WHITE
    }
  }
}));

export default useStyles;
