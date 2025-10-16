import { makeStyles } from "tss-react/mui";
import { SPACING_2, SPACING_3 } from "utils/layouts";

const useStyles = makeStyles()((theme) => ({
  description: {
    marginBottom: theme.spacing(SPACING_2),
    fontSize: 14
  },
  authenticationLabel: {
    minWidth: 120,
    margin: theme.spacing(SPACING_2, 0, SPACING_3, 0)
  },
  descriptionContainer: {
    padding: theme.spacing(SPACING_2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper
  },
  linkInline: {
    display: "inline"
  },
  linkBlock: {
    display: "block"
  },
  authenticationSection: {
    marginBottom: theme.spacing(SPACING_3)
  }
}));

export default useStyles;
