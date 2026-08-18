import { useState, type MouseEvent } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import MuiMenu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { useIntl } from "react-intl";
import { SUPPORTED_LOCALES, getVisibleLocales, type SupportedLocale } from "@theme/translations/localeManager";
import { useLocaleContext } from "contexts/LocaleContext";
import { type SupportedLocale as ContextLocale } from "translations/localeManager";
import { LOCALE_FLAGS } from "./localeFlags";

const TRIGGER_FLAG_SIZE = 24;
const MENU_FLAG_SIZE = 28;

const LocaleFlag = ({ locale, size }: { locale: SupportedLocale; size: number }) => (
  <Avatar src={LOCALE_FLAGS[locale]} alt="" sx={{ width: size, height: size, border: 1, borderColor: "divider" }} />
);

const LanguageSwitcher = () => {
  const intl = useIntl();
  const { locale, setLocale } = useLocaleContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const visibleLocales = getVisibleLocales();

  if (visibleLocales.length <= 1) {
    return null;
  }

  const selectLocale = (nextLocale: SupportedLocale) => {
    setLocale(nextLocale as ContextLocale);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
        aria-label={intl.formatMessage({ id: "language" })}
        aria-haspopup="listbox"
        aria-expanded={Boolean(anchorEl)}
        size="small"
        data-test-id="select_language"
      >
        <LocaleFlag locale={locale} size={TRIGGER_FLAG_SIZE} />
      </IconButton>
      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        MenuListProps={{ role: "listbox" }}
        PaperProps={{ sx: { mt: 1, minWidth: 220, borderRadius: 2 } }}
      >
        {visibleLocales.map((localeKey) => (
          <MuiMenuItem
            key={localeKey}
            selected={localeKey === locale}
            onClick={() => selectLocale(localeKey)}
            sx={{ gap: 1.5, py: 1 }}
            data-test-id={`option_lang_${localeKey}`}
          >
            <LocaleFlag locale={localeKey} size={MENU_FLAG_SIZE} />
            <ListItemText primary={SUPPORTED_LOCALES[localeKey]} primaryTypographyProps={{ color: "inherit" }} />
          </MuiMenuItem>
        ))}
      </MuiMenu>
    </>
  );
};

export default LanguageSwitcher;
