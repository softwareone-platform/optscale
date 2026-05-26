import { createContext } from "react";
import { DEFAULT_LOCALE, SupportedLocale } from "@theme/translations/localeManager";

type LocaleContextType = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
};

export default createContext<LocaleContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});
