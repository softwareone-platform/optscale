import {makeStyles} from "tss-react/mui";
import {KU_BOX_SHADOW, KU_SPACING_2} from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  boxShadow: {
    '.MuiPaper-rounded': {
      borderRadius: KU_SPACING_2,
      boxShadow: KU_BOX_SHADOW,
      textAlign: 'center',
      background: '#CAE4FF80'
    },
    '.MuiBox-root': {
      justifyContent: 'center',
      color: 'black'
    }
  }
}));

export default useStyles;
