import {makeStyles} from "tss-react/mui";
import {KU_BOX_SHADOW, KU_SPACING_1, KU_SPACING_2} from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  customBox: {
    margin: 0,
    marginBottom: KU_SPACING_2,
    '.MuiPaper-rounded': {
      borderRadius: KU_SPACING_2,
      textAlign: 'center',
      padding: KU_SPACING_1,
      background: '#CAE4FF',
      boxShadow: KU_BOX_SHADOW
    },
    '.MuiBox-root': {
      justifyContent: 'center',
      color: 'black'
    }
  }
}));

export default useStyles;
