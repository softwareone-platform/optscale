import LanguageIcon from "@mui/icons-material/Language";
import Box from "@mui/material/Box";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { SUPPORTED_LOCALES, getVisibleLocales } from "@theme/translations/localeManager";
import { useLocaleContext } from "contexts/LocaleContext";
import { SupportedLocale } from "translations/localeManager";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocaleContext();

  const visibleLocales = getVisibleLocales();

  const handleChange = (event: SelectChangeEvent<SupportedLocale>) => {
    setLocale(event.target.value as SupportedLocale);
  };

  // Nothing to switch to (e.g. every non-default language is still experimental/hidden) —
  // don't show a single-option control.
  if (visibleLocales.length <= 1) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center">
      <LanguageIcon color="primary" sx={{ mr: 0.5, fontSize: "1.25rem" }} />
      <MuiSelect
        value={locale}
        onChange={handleChange}
        variant="standard"
        disableUnderline
        sx={{
          color: "primary.main",
          fontSize: "0.875rem",
          fontWeight: 500,
          "& .MuiSelect-select": {
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: "20px !important"
          },
          "& .MuiSvgIcon-root": {
            color: "primary.main",
            fontSize: "1.25rem"
          }
        }}
        data-test-id="select_language"
      >
        {visibleLocales.map((localeKey) => (
          <MuiMenuItem key={localeKey} value={localeKey} data-test-id={`option_lang_${localeKey}`}>
            {SUPPORTED_LOCALES[localeKey]}
          </MuiMenuItem>
        ))}
      </MuiSelect>
    </Box>
  );
};

export default LanguageSwitcher;
