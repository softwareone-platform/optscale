import { makeStyles } from "tss-react/mui";
import { MPT_SPACING_1, MPT_SPACING_3, MPT_TERTIARY_PRIMARY } from "../../utils/layouts";

const useStyles = makeStyles()((theme) => {
  const gap = theme.spacing(1);
  return {
    wrapper: {
      display: "inline-flex",
      alignItems: "center",
      flexWrap: "wrap",
      margin: `-${gap} 0 0 -${gap}`,
      ".MuiChip-outlinedSecondary": {
        backgroundColor: MPT_TERTIARY_PRIMARY
      },
      "& > *": {
        margin: `${gap} 0 0 ${gap}`,
        height: MPT_SPACING_3,
        "> .MuiChip-label": {
          padding: MPT_SPACING_1
        },

        "&:first-of-type": {
          marginLeft: 0
        }
      }
    }
  };
});

export default useStyles;
