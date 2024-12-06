import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  tableContainer: {
    width: "100%",
    display: "block",
    wordBreak: "initial" // shown inside MUI Drawer table inherits word-break: "break-word" which leads to letter-by-letter break in side modals, for example
  },
  tableGradientOverlay: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "250px",
    height: "100%",
    background: "linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
    pointerEvents: "none"
  },
  hoverableRow: {
    cursor: "pointer"
  }
}));

export default useStyles;
