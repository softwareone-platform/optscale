import { makeStyles } from "tss-react/mui";

const HEADER_CLEARANCE = 96;

const useStyles = makeStyles()((theme) => ({
  panel: {
    position: "fixed",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    width: 380,
    // Stops below the app header, so the panel never covers the user menu it is used beside.
    maxHeight: `calc(100vh - ${HEADER_CLEARANCE}px - ${theme.spacing(2)})`,
    overflowY: "auto",
    // Under popovers and dialogs, so the user menu and the dialogs it opens are never hidden behind it.
    zIndex: theme.zIndex.modal - 1,
    textAlign: "left"
  },
  // While a dialog is open its backdrop would swallow every click, the fill buttons' included.
  aboveDialogs: {
    zIndex: theme.zIndex.modal + 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: "pointer"
  },
  body: {
    padding: theme.spacing(2)
  },
  code: {
    fontFamily: "monospace",
    backgroundColor: theme.palette.action.hover,
    padding: "0 4px",
    borderRadius: 4
  },
  hint: {
    color: theme.palette.text.secondary
  },
  // Label, value, fill: the values line up under each other, the fill buttons at the right edge.
  credential: {
    display: "grid",
    gridTemplateColumns: "84px 1fr auto",
    alignItems: "center",
    columnGap: theme.spacing(1)
  },
  // Dotted, so it reads as "hover for more".
  credentialLabel: {
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: "underline dotted",
    cursor: "help",
    justifySelf: "start"
  },
  // Label, value, ⓘ and the action on one line; a long address gives way to the buttons.
  sessionRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    "& svg": {
      cursor: "help"
    }
  },
  sessionLabel: {
    flexShrink: 0
  },
  sessionValue: {
    minWidth: 0
  },
  sessionActions: {
    display: "flex",
    gap: 4,
    marginLeft: "auto",
    flexShrink: 0
  },
  // Smaller than MUI's small button, so it sits within the row's text height.
  sessionAction: {
    minWidth: 0,
    padding: "0 8px",
    fontSize: theme.typography.caption.fontSize,
    lineHeight: 1.8
  },
  description: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    "& svg": {
      cursor: "help"
    }
  }
}));

export default useStyles;
