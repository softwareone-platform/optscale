import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  buttonContainer: {
    display: "flex",
    borderRadius: "50%"
  },
  button: {
    height: 36,
    width: 36,
    padding: 0
  },
  buttonText: {
    lineHeight: 1.6
  },
  outlined: {
    border: `1px solid ${theme.palette.primary.main}`
  },
  filled: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    },
    backgroundColor: theme.palette.secondary.main
  },
  highlighted: {
    backgroundColor: theme.palette.action.hover
  },
  contrast: {
    color: theme.palette.secondary.contrastText
  },
  outsideMonthText: {
    "&.Mui-disabled, &[disabled]": {
      color: theme.palette.grey[500]
    }
  },
  outsideBoundsText: {
    "&.Mui-disabled, &[disabled]": {
      color: theme.palette.common.black,
      textDecoration: "line-through"
    }
  }
}));

export default useStyles;
