import { makeStyles } from "tss-react/mui";
import {
  MPT_ALERTS_INFO_1,
  MPT_BOX_SHADOW_HOVER,
  MPT_BRAND_PRIMARY,
  MPT_GRAY_1,
  MPT_GRAY_2,
  MPT_SPACING_2,
  MPT_SPACING_3,
  MPT_TERTIARY_BLUE_3
} from "@theme/utils/layouts";

// Same-width slot for every method, so the method names beside the icons line up in the picker.
const METHOD_ICON_SLOT_SIZE = 56;

const useStyles = makeStyles()((theme) => ({
  content: {
    textAlign: "left"
  },
  methodCard: {
    display: "flex",
    alignItems: "center",
    gap: MPT_SPACING_2,
    padding: MPT_SPACING_3,
    border: `1px solid ${MPT_GRAY_2}`,
    borderRadius: MPT_SPACING_2
  },
  selectableMethodCard: {
    cursor: "pointer",
    margin: 0,
    "&:hover": {
      boxShadow: MPT_BOX_SHADOW_HOVER
    }
  },
  selectedMethodCard: {
    borderColor: MPT_BRAND_PRIMARY
  },
  methodName: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.dark
  },
  defaultMethodChip: {
    backgroundColor: MPT_ALERTS_INFO_1,
    color: MPT_BRAND_PRIMARY
  },
  instructions: {
    backgroundColor: MPT_GRAY_1,
    padding: MPT_SPACING_3
  },
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
