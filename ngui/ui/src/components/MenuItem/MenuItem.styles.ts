import { makeStyles } from "tss-react/mui";
import { MPT_BRAND_PRIMARY } from "../../utils/layouts";

const useStyles = makeStyles()((theme) => ({
  icon: {
    minWidth: "2rem"
  },
  nested: {
    paddingLeft: theme.spacing(6)
  },
  menuLink: {
    width: "100%",
    display: "block",
    color: "inherit",
    textDecoration: "none",

    "& .MuiListItemText-root": {
      position: "relative"
    },
    "& .MuiListItemText-root:before": {
      content: '""',
      position: "absolute",
      width: "0px",
      transition: "all ease-in 0.2s ",
      height: "100%",
      borderRadius: "5px",
      left: "-25px",
      backgroundColor: MPT_BRAND_PRIMARY
    }
  },
  activeLink: {
    color: "black",
    "& .MuiListItemText-root:before": {
      width: 10
    },
    "& .MuiListItemSecondaryAction-root": {
      "& svg": {
        color: "black"
      },
      "& span": {
        color: "black"
      },
      "& .MuiIconButton-root": {
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
          "& svg": {
            color: "black"
          },
          "& span": {
            color: "black"
          }
        }
      }
    },
    "& .listItem": {
      // backgroundColor: theme.palette.action.selected,
      "& svg": {
        color: "black"
      },
      "& span": {
        color: "black"
      }
    }
  }
}));

export default useStyles;
