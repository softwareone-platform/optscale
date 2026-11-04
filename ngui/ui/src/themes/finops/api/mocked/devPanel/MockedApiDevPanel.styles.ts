import { makeStyles } from "tss-react/mui";
import { MPT_BRAND_PRIMARY, MPT_BRAND_WHITE, MPT_GRAY_1, MPT_GRAY_4, MPT_SPACING_1, MPT_SPACING_2 } from "@theme/utils/layouts";

const useStyles = makeStyles()((theme) => ({
  panel: {
    position: "fixed",
    right: MPT_SPACING_2,
    bottom: MPT_SPACING_2,
    width: 380,
    maxHeight: `calc(100vh - 2 * ${MPT_SPACING_2})`,
    overflowY: "auto",
    zIndex: theme.zIndex.snackbar,
    textAlign: "left"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${MPT_SPACING_1} ${MPT_SPACING_2}`,
    backgroundColor: MPT_BRAND_PRIMARY,
    color: MPT_BRAND_WHITE,
    cursor: "pointer"
  },
  body: {
    padding: MPT_SPACING_2
  },
  code: {
    fontFamily: "monospace",
    backgroundColor: MPT_GRAY_1,
    padding: "0 4px",
    borderRadius: 4
  },
  hint: {
    color: MPT_GRAY_4
  },
  details: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    columnGap: MPT_SPACING_2,
    rowGap: 2,
    margin: 0,
    fontSize: theme.typography.caption.fontSize,
    "& dt": {
      color: MPT_GRAY_4
    },
    "& dd": {
      margin: 0,
      fontFamily: "monospace",
      wordBreak: "break-all"
    }
  }
}));

export default useStyles;
