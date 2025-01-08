import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  titleText: {
    marginRight: theme.spacing(0.5),
    fontSize: theme.typography.fontSize,
    lineHeight: '20px',
    fontWeight: 'bold'
  },
  sortGroupsByWrapper: {
    marginLeft: theme.spacing(3)
  }
}));

export default useStyles;
