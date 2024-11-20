import {makeStyles} from "tss-react/mui";
import {KU_SPACING_2} from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  customBox: {
    marginBottom: KU_SPACING_2,
    '.MuiPaper-rounded': {
      borderRadius: KU_SPACING_2,
      textAlign: 'center',
      background: '#CAE4FF80',
    },
    '.MuiBox-root': {
      justifyContent: 'center',
      color: 'black'
    }
  }
}));

export default useStyles;
