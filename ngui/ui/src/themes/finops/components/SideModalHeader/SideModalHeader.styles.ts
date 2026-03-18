import { makeStyles } from "tss-react/mui";
import { MPT_BRAND_WHITE, MPT_GRADIENT } from "@theme/utils/layouts";

const useStyles = makeStyles()((theme) => ({
  title: {
    flexGrow: 1,
    display: "flex",
    alignContent: "center",
    color: MPT_BRAND_WHITE
  },
  headerPrimary: {
    color: theme.palette.primary.contrastText,
    background: MPT_GRADIENT
  },
  headerSuccess: {
    color: theme.palette.success.contrastText,
    backgroundColor: theme.palette.success.main
  },
  headerInfo: {
    color: theme.palette.info.dark,
    backgroundColor: theme.palette.info.light
  },
  headerError: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main
  }
}));

export default useStyles;
