import { makeStyles } from "tss-react/mui";
import { KU_SPACING_1, KU_SPACING_3, KU_SPACING_6 } from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  MainMenu: {
    paddingTop: KU_SPACING_3,
    "& .MuiListItem-root": {
      paddingLeft: KU_SPACING_6,
      paddingRight: KU_SPACING_6,
      paddingTop: KU_SPACING_1,
      paddingBottom: KU_SPACING_1
    },
    "& .MuiListItemText-root": {
      margin: 0,
      color: "black"
    },
    "& .MuiTypography-root": {
      lineHeight: "20px"
    }
  }
}));

export default useStyles;
