import { makeStyles } from "tss-react/mui";

const getFormAndMapWrapperClasses = (theme) => {
  const wrapperClass = {
    [theme.breakpoints.down("xl")]: {
      width: 400
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400,
      width: "100%"
    },
    width: 600
  };
  return {
    wrapper: wrapperClass
  };
};

const useStyles = makeStyles()((theme) => ({
  root: {
    height: "100vh"
  },
  centeredFlexColumnDirection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center"
  },
  linkWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-around"
    }
  },
  imagesWithCaptions: {
    maxWidth: "590px",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: "690px"
    }
  },
  imageWithCaptionWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  image: {
    maxWidth: "122px",
    width: "80%",
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down("md")]: {
      width: "50%"
    }
  },
  caption: {
    textAlign: "center",
    lineHeight: 1.25
  },
  webIconMargin: {
    marginRight: "0.5rem"
  },
  leftSideGrid: {
    backgroundColor: theme.palette.common.white
  },
  rightSideGrid: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: "url('/sample-chart-bcg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(2,62,104,0.8)",
      zIndex: 1
    }
  },
  ...getFormAndMapWrapperClasses(theme)
}));

export default useStyles;
