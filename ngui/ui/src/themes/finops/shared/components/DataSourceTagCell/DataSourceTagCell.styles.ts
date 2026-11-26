import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { MPT_SPACING_2 } from "@theme/utils/layouts";
const useStyles = makeStyles()((theme: Theme) => ({
  icon: {
    fontSize: MPT_SPACING_2,
    "& > svg": {
      paddingTop: "2px",
      width: "0.8rem",
      height: "0.8rem"
    }
  },
  labelSuccess: {
    color: theme.palette.success.main
  },
  tagValue: {
    color: theme.palette.primary.gray4
  }
}));

export default useStyles;
