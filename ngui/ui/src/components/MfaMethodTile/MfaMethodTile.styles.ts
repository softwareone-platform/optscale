import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  tile: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    width: "100%",
    margin: 0,
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    textAlign: "left"
  },
  interactive: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: theme.shadows[2]
    },
    // Greyed, not faded, so a chip on it stays readable.
    "&.Mui-disabled": {
      backgroundColor: theme.palette.action.disabledBackground
    }
  },
  selected: {
    borderColor: theme.palette.primary.main
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
