import { makeStyles } from "tss-react/mui";
import { MPT_SPACING_2 } from "utils/layouts";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    "& > *": {
      marginRight: theme.spacing(1),
      "&:last-child": {
        marginRight: 0
      }
    }
  },
  wrapperHorizontal: {
    "& > *": {
      marginBottom: MPT_SPACING_2,
      "&:last-child": {
        marginBottom: 0
      }
    }
  }
}));

export default useStyles;
