import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {TssCacheProvider} from "tss-react";
import {useThemeSettingsOptions} from "hooks/useThemeSettingsOptions";
import getTheme from "theme";
import {GlobalStyles} from "@mui/material";
import {BRAND_GRAY_1} from "../../utils/layouts";

const muiCache = createCache({
    key: "mui",
    prepend: true
});

const tssCache = createCache({
    key: "tss"
});

const globalScrollbarStyles = (
    <GlobalStyles
        styles={{
            "::-webkit-scrollbar": {
                width: "5px"
            },
            "::-webkit-scrollbar-track": {
                background: BRAND_GRAY_1
            },
            "::-webkit-scrollbar-thumb": {
                borderRadius: "0",
                backgroundClip: "padding-box",
                backgroundColor: BRAND_GRAY_1
            },
            "::-webkit-scrollbar-thumb:hover": {
                backgroundColor: BRAND_GRAY_1
            },
            "*": {
                scrollbarColor: `${BRAND_GRAY_1} transparent`,
                scrollbarWidth: "thin"
            },
        }}
    />
);

const ThemeProviderWrapper = ({children}) => {
    const themeSettings = useThemeSettingsOptions();

    const theme = getTheme(themeSettings);

    return (
        <CacheProvider value={muiCache}>
            <TssCacheProvider value={tssCache}>
                <ThemeProvider theme={theme}>
                    {globalScrollbarStyles}
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
            </TssCacheProvider>
        </CacheProvider>
    );
};

export default ThemeProviderWrapper;
