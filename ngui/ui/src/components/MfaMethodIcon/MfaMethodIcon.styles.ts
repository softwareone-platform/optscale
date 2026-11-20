import { makeStyles } from "tss-react/mui";

// Same-width slot for every method, so the method names beside the icons line up in a list.
const METHOD_ICON_SLOT_SIZE = 56;

const useStyles = makeStyles()((theme) => ({
  methodIconSlot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: METHOD_ICON_SLOT_SIZE
  },
  authenticatorAppIcon: {
    fontSize: METHOD_ICON_SLOT_SIZE,
    color: theme.palette.primary.main
  },
  emailIcon: {
    fontSize: 36,
    color: theme.palette.primary.main
  }
}));

export default useStyles;
