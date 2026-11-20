import { makeStyles } from "tss-react/mui";
import { MPT_ALERTS_INFO_1, MPT_BRAND_PRIMARY } from "@theme/utils/layouts";

const useStyles = makeStyles()(() => ({
  chip: {
    backgroundColor: MPT_ALERTS_INFO_1,
    color: MPT_BRAND_PRIMARY
  }
}));

export default useStyles;
