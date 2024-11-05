import {makeStyles} from "tss-react/mui";
import {SPACING_1} from "utils/layouts";

export const DRAWER_WIDTH = 250;

const useStyles = makeStyles()((theme) => ({
    appBar: {
        boxShadow: "none"
    },
    headerSpacer: {
        background: 'linear-gradient(270deg, #00c9cd, #472aff, #392d9c);',
        height: '3px'
    },
    toolbar: {
        display: "flex",
        height: '75px',
        alightItems: 'center',
        justifyContent: "space-between",
        backgroundColor: 'white',
        paddingLeft: '21px',
        paddingRight: '21px'
    },
    logo: {
        [theme.breakpoints.down("md")]: {
            flex: 1
        },
        display: 'flex',
        gap: '30px',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: '26px',
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'middle',
        display: 'flex'
    },
    marginRight1: {
        marginRight: theme.spacing(SPACING_1)
    },
    marginLeft1: {
        marginLeft: theme.spacing(SPACING_1)
    },
    drawerPaper: {
        position: "relative",
        width: DRAWER_WIDTH,
        paddingTop: theme.spacing(SPACING_1)
    },
    content: {
        overflowY: "auto",
        paddingLeft: "0",
        paddingRight: "0",
        maxWidth: "none",
        // that way PageContentWrapper will fill whole page height
        display: "flex",
        flexDirection: "column"
    },
    mobileRegisterButton: {
        backgroundColor: theme.palette.success.main,
        color: "inherit"
    },
    layoutWrapper: {
        display: "flex",
        flexDirection: "column",
        height: "100vh"
    },
    menuAndContentWrapper: {
        overflow: "hidden",
        flexGrow: 1,
        display: "flex"
    },
    wrapper: {
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 0",
        [theme.breakpoints.up("md")]: {
            transition: "grid-template-columns 0.2s ease-in"
        }
    },
    wrapperWithDocsOpened: {
        [theme.breakpoints.up("md")]: {
            gridTemplateColumns: `minmax(0, 1fr) 400px`
        },
        gridTemplateColumns: `0 minmax(0, 1fr)`
    },
    hideableLayoutWrapper: {
        [theme.breakpoints.down("md")]: {
            visibility: "hidden"
        }
    }
}));

export default useStyles;
