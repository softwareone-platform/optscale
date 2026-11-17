import { makeStyles } from "tss-react/mui";
import { MPT_SPACING_4 } from "../../utils/layouts";

const useStyles = makeStyles()((theme) => ({
  menu: {
    paddingTop: MPT_SPACING_4,
    "& .MuiAccordionSummary-root": {
      backgroundColor: "unset",
      padding: 0,
      color: theme.palette.info.main,
      justifyContent: "flex-start",
      "& .MuiAccordionSummary-expandIconWrapper": {
        transform: "rotate(0deg)",
        color: theme.palette.info.main
      },
      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(-180deg)"
      },
      "& .MuiAccordionSummary-content": {
        flexGrow: 0
      },
      "& .MuiAccordionSummary-content .MuiListItem-root": {}
    },
    "& .MuiAccordionDetails-root": {
      padding: 0
    }
  }
}));

export default useStyles;
