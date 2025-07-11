import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  tableLeftGradientOverlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "0",
    height: "calc(100% - 60px)",
    background: "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
    pointerEvents: "none",
    transition: "width ease-in-out 0.5s",
    "&.gradientActive": {
      width: "250px"
    }
  },
  tableRightGradientOverlay: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "0",
    height: "calc(100% - 60px)",
    background: "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
    pointerEvents: "none",
    transition: "width ease-out 0.3s",
    "&.gradientActive": {
      width: "250px"
    }
  }
}));

export default useStyles;
