import { ComponentProps, ReactNode, useCallback, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import {
  DEFAULT_LOCALE,
  SupportedLocale,
  getConfigForLocale,
  resolveInitialLocale,
  storeLocale
} from "@theme/translations/localeManager";
import LocaleContext from "contexts/LocaleContext/LocaleContext";

const LocaleContextProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(resolveInitialLocale);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    storeLocale(newLocale);
    setLocaleState(newLocale);
  }, []);

  const intlConfig = useMemo(() => getConfigForLocale(locale), [locale]);

  // tsc can't follow the vite theme resolver, so it still types LocaleContext with the base
  // locale union (en-US/es-ES). At runtime the base localeManager is this theme's, so the
  // extra locales are valid — reconcile the nominal mismatch here.
  const contextValue = useMemo(
    () => ({ locale, setLocale }) as ComponentProps<typeof LocaleContext.Provider>["value"],
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      <IntlProvider
        locale={intlConfig.locale}
        messages={intlConfig.messages}
        formats={intlConfig.formats}
        defaultLocale={DEFAULT_LOCALE}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
