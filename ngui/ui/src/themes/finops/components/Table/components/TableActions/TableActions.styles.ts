import { makeStyles } from "tss-react/mui";
import { MPT_SPACING_3 } from "@theme/utils/layouts";

const useStyles = makeStyles()((theme) => ({
  actionsWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    flexGrow: 1,
    maxWidth: "100%",
    marginBottom: MPT_SPACING_3,
    "& > *": {
      "&:not(:last-child)": {
        marginRight: theme.spacing(1)
      }
    },
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(1)
    }
  }
}));

export default useStyles;
