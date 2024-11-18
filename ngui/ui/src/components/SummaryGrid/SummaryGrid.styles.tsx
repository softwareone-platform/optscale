import {makeStyles} from "tss-react/mui";
import {KU_BOX_SHADOW, KU_SPACING_2} from "../../utils/layouts";

const useStyles = makeStyles()(() => ({
  boxShadow: {
    '> .MuiBox-root': {
      background: 'white',
      borderRadius: KU_SPACING_2,
      boxShadow: KU_BOX_SHADOW,
      textAlign: 'center'
    },
    '.MuiPaper-root': {
      background: 'none'
    },
    '.MuiBox-root': {
      justifyContent: 'center',
      color: 'black'
    }

  }
}));

export default useStyles;
