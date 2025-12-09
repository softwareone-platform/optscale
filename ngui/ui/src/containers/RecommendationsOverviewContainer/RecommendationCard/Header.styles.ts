import { makeStyles } from "tss-react/mui";
import { MPT_SPACING_1, MPT_SPACING_2, SPACING_2 } from "utils/layouts";

const useStyles = makeStyles()((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(SPACING_2),
    justifyContent: "space-between",
    ":only-child": {
      marginBottom: 0
    }
  },
  titleText: {
    display: "flex"
  },
  value: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  titleIcon: {
    marginTop: "5px",
    marginRight: MPT_SPACING_1
  },
  title: {
    marginRight: MPT_SPACING_2,
    marginBottom: MPT_SPACING_2
  }
}));

export default useStyles;
