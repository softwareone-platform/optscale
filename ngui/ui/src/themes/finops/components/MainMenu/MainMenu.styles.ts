import { makeStyles } from "tss-react/mui";
import { MPT_SPACING_1, MPT_SPACING_3, MPT_SPACING_6 } from "@theme/utils/layouts";

const useStyles = makeStyles()(() => ({
  MainMenu: {
    paddingTop: MPT_SPACING_3,
    "& .MuiListItem-root": {
      paddingLeft: MPT_SPACING_6,
      paddingRight: MPT_SPACING_6,
      paddingTop: MPT_SPACING_1,
      paddingBottom: MPT_SPACING_1
    },
    "& .MuiListItemText-root": {
      margin: 0,
      color: "black"
    },
    "& .MuiTypography-root": {
      lineHeight: "20px"
    },
    "& .MuiListItemIcon-root": {
      display: "none"
    }
  }
}));

export default useStyles;
