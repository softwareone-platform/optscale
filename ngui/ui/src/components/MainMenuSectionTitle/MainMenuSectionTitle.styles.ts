import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  titleIcon: {
    position: "absolute",
    left: "-25px",
    top: "3px",
    fontSize: "14px"
  },
  text: {
    fontWeight: "bold",
    color: "black",
    position: "relative"
  },
  textWrapper: {
    padding: 0
  }
}));

export default useStyles;
