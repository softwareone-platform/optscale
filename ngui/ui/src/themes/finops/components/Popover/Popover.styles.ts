import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  rightLabelPosition: {
    display: "flex",
    justifyContent: "flex-end"
  },
  container: {
    display: "inline-block"
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
    "& > *": {
      marginRight: theme.spacing(1),
      "&:last-child": {
        marginRight: 0
      }
    },
    "> button": {
      minWidth: "80px"
    }
  },
  fullWidth: {
    width: "100%"
  }
}));

export default useStyles;
