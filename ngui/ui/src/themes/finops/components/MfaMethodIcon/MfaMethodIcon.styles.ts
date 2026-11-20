import { makeStyles } from "tss-react/mui";
import { MPT_TERTIARY_BLUE_3 } from "@theme/utils/layouts";

// Same-width slot for every method, so the method names beside the icons line up in a list.
const METHOD_ICON_SLOT_SIZE = 56;

const useStyles = makeStyles()(() => ({
  methodIconSlot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: METHOD_ICON_SLOT_SIZE
  },
  authenticatorAppIcon: {
    fontSize: METHOD_ICON_SLOT_SIZE,
    color: MPT_TERTIARY_BLUE_3
  },
  emailIcon: {
    fontSize: 36,
    color: MPT_TERTIARY_BLUE_3
  }
}));

export default useStyles;
