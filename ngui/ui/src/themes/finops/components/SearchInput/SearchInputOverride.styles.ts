import { makeStyles } from "tss-react/mui";
import { MPT_BRAND_TYPE } from "@theme/utils/layouts";

const useStyles = makeStyles()(() => ({
  searchInputWrapper: {
    "& .MuiOutlinedInput-root > button:nth-of-type(2)": {
      position: "absolute",
      right: 0,
      height: "100%"
    },
    input: {
      fontSize: "14px",
      marginRight: "20px"
    },
    "& .MuiSvgIcon-root": {
      color: MPT_BRAND_TYPE
    }
  }
}));

export default useStyles;
