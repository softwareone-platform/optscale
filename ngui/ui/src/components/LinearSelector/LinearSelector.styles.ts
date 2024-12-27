import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  const gap = theme.spacing(1);
  const halfGap = theme.spacing(0.5);

  return {
    showMoreFilters: {
      color: theme.palette.primary.main,
      padding: "5px 8px",
    },
    clearAllFilters: {
      backgroundColor: theme.palette.error.primary,
      color: theme.palette.error.text,
      border: "none",
      fontSize: "13px",
      padding: "5px 8px",
      cursor: "pointer",
      "&:hover": {
        border: "none"
      }
    },
    wrapper: {
      display: "inline-flex",
      alignItems: "center",
      flexWrap: "wrap",
      margin: `-${gap} -${halfGap} 0 -${halfGap}`,
      "& > *": {
        margin: `${halfGap}`
      },
      minHeight: "40px"
    },
    checkboxMenuItem: {
      paddingLeft: theme.spacing(1)
    },
    labelIcon: {
      // the same styles as for Button component with endIcon
      fontSize: "18px"
    },
    label: {
      display: "inline-flex"
    }
  };
});

export default useStyles;
