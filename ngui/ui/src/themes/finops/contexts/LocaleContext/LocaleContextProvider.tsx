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

  // tsc types LocaleContext with the base locale union (it can't follow the vite resolver);
  // this theme's locales apply at runtime, so reconcile the mismatch here.
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
