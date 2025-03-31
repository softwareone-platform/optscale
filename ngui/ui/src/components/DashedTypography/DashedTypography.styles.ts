import { makeStyles } from "tss-react/mui";
import {MPT_BRAND_PRIMARY, MPT_BRAND_TYPE, MPT_GRAY_3, MPT_SPACING_1} from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  dashed: {
    display: "inline",
    borderBottom: "1px dashed",
    width: "fit-content"
  },
  chip: {
    display: "inline",
    border: `1px solid ${MPT_GRAY_3}`,
    padding: `4px ${MPT_SPACING_1}`,
    borderRadius: MPT_SPACING_1,
    background: "none",
    width: "fit-content",
    transition: "background 0.2s ease-in-out, border 0.2s ease-in-out",
    color: MPT_BRAND_TYPE,
    "&:hover": {
      borderColor: MPT_BRAND_TYPE,
      background: "rgba(0, 0, 0, 0.1)"
    }
  },
  cursorPointer: {
    "&:hover": {
      cursor: "pointer",
      background: "transparent",
      borderColor: MPT_BRAND_PRIMARY
    }
  },
  right: {
    marginRight: "0.2rem"
  }
}));

export default useStyles;
