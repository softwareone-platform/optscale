import { makeStyles } from "tss-react/mui";
import { MPT_GRADIENT } from "@theme/utils/layouts";

export const DRAWER_WIDTH = 250;

const overrideStyles = makeStyles()((theme) => ({
  appBar: {
    boxShadow: "none"
  },
  headerSpacer: {
    background: MPT_GRADIENT,
    height: "3px"
  },
  toolbar: {
    display: "flex",
    height: "75px",
    alightItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingLeft: "21px",
    paddingRight: "21px"
  },
  logo: {
    [theme.breakpoints.down("md")]: {
      flex: 1
    },
    display: "flex",
    gap: "30px",
    alignItems: "center"
  },
  headerTitle: {
    fontSize: "26px",
    color: "black",
    fontWeight: "bold",
    alignItems: "center",
    gap: "10px",
    justifyContent: "middle",
    display: "flex"
  },
  preloaderOverlay: {
    position: "absolute",
    zIndex: 100000,
    width: "100%",
    height: "100%",
    background: "#ffffff",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default overrideStyles;
