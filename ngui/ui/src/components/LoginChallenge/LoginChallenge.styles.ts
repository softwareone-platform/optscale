import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  // The small print on a card: who is signing in.
  note: {
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
