import { makeStyles } from "tss-react/mui";
import { MPT_BOX_WHITE_SHADOW_RADIUS_2, MPT_SPACING_3, MPT_SPACING_6 } from "@theme/utils/layouts";

const useStyles = makeStyles()(() => ({
  screen: {
    display: "flex",
    justifyContent: "center",
    padding: `${MPT_SPACING_6} ${MPT_SPACING_3}`
  },
  // The invitation screen's card, at the width the designs give it.
  card: {
    ...MPT_BOX_WHITE_SHADOW_RADIUS_2,
    width: "100%",
    maxWidth: 548,
    textAlign: "center"
  }
}));

export default useStyles;
