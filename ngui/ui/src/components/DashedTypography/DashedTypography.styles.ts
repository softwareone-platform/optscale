import { makeStyles } from "tss-react/mui";
import { MPT_BOX_SHADOW_THIN, MPT_SPACING_2 } from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  dashed: {
    display: "inline",
    borderBottom: "1px dashed",
    width: "fit-content"
  },
  chip: {
    display: "inline",
    border: `1px solid rgba(0, 0, 0, 0)`,
    padding: `5px ${MPT_SPACING_2}`,
    borderRadius: MPT_SPACING_2,
    boxShadow: MPT_BOX_SHADOW_THIN,
    background: "none",
    width: "fit-content",
    transition: "background, border ease-in-out 0.2s",
    "&:hover": {
      background: "white",
      borderColor: "rgba(0, 0, 0, 0.2)"
    }
  },
  cursorPointer: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  right: {
    marginRight: "0.2rem"
  }
}));

export default useStyles;
