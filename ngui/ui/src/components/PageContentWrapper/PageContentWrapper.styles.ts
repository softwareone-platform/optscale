import { makeStyles } from "tss-react/mui";
import {KU_SPACING_3} from "utils/layouts";

const useStyles = makeStyles()(() => ({
  page: {
    padding: KU_SPACING_3,
    display: 'flex',
    paddingTop: KU_SPACING_3
  }
}));

export default useStyles;
