import { makeStyles } from "tss-react/mui";
import {KU_SPACING_3} from "utils/layouts";

const useStyles = makeStyles()((theme) => ({
  page: {
    flexGrow: 1,
    padding: KU_SPACING_3,
    paddingTop: KU_SPACING_3,
    backgroundColor: '#F4F6F8',
    gap: '24px',
    display: 'flex',
    boxSizing: 'border-box',
    "& .MuiGrid-container": {
      gap: '24px',
    },
    "& .MuiGrid-item": {
      flexBasis: 'calc(50% - 24px)', //TODO: make width dynamic
      border: 'none',

    },
    "& .MuiPaper-root": {
      borderRadius: '10px',
      background: 'white',
      boxShadow: '0 0 6px 0px #0000001a',
    }
  }
}));

export default useStyles;
