import { makeStyles } from "tss-react/mui";
import {
  MPT_BOX_SHADOW_HOVER,
  MPT_BRAND_PRIMARY,
  MPT_GRAY_1,
  MPT_GRAY_2,
  MPT_SPACING_2,
  MPT_SPACING_3
} from "@theme/utils/layouts";

const useStyles = makeStyles()((theme) => ({
  tile: {
    display: "flex",
    alignItems: "center",
    gap: MPT_SPACING_2,
    width: "100%",
    margin: 0,
    padding: MPT_SPACING_3,
    border: `1px solid ${MPT_GRAY_2}`,
    borderRadius: MPT_SPACING_2,
    textAlign: "left"
  },
  interactive: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: MPT_BOX_SHADOW_HOVER
    },
    // Greyed, not faded, so a chip on it stays readable.
    "&.Mui-disabled": {
      backgroundColor: MPT_GRAY_1
    }
  },
  selected: {
    borderColor: MPT_BRAND_PRIMARY
  },
  // Takes the room between the icon and the action, so the action sits at the right edge.
  details: {
    flexGrow: 1
  },
  name: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.dark
  }
}));

export default useStyles;
