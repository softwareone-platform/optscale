import messagesDeDE from "./de-DE/index";
import messagesEnUS from "./en-US/index";
import messagesEsES from "./es-ES/index";
import messagesFrFR from "./fr-FR/index";
import messagesPlPL from "./pl-PL/index";

export const DEFAULT_LOCALE = "en-US";

type LocaleDefinition = {
  label: string;
  messages: Record<string, string>;
  experimental?: boolean;
};

const LOCALES = {
  "en-US": { label: "English", messages: messagesEnUS },
  "es-ES": { label: "Español", messages: messagesEsES, experimental: true },
  "fr-FR": { label: "Français", messages: messagesFrFR, experimental: true },
  "de-DE": { label: "Deutsch", messages: messagesDeDE, experimental: true },
  "pl-PL": { label: "Polski", messages: messagesPlPL, experimental: true }
} as const satisfies Record<string, LocaleDefinition>;

export type SupportedLocale = keyof typeof LOCALES;

const entries = Object.entries(LOCALES) as [SupportedLocale, LocaleDefinition][];

export const SUPPORTED_LOCALES = Object.fromEntries(entries.map(([code, { label }]) => [code, label])) as Record<
  SupportedLocale,
  string
>;

// Languages hidden from users (and excluded from the completeness gate) until signed off.
export const EXPERIMENTAL_LOCALES = new Set<SupportedLocale>(
  entries.filter(([, { experimental }]) => experimental).map(([code]) => code)
);

if (EXPERIMENTAL_LOCALES.has(DEFAULT_LOCALE)) {
  throw new Error(`DEFAULT_LOCALE "${DEFAULT_LOCALE}" must never be marked experimental.`);
}

const messagesMap = Object.fromEntries(entries.map(([code, { messages }]) => [code, messages])) as Record<
  SupportedLocale,
  Record<string, string>
>;

export const getMessagesForLocale = (locale: SupportedLocale): Record<string, string> =>
  messagesMap[locale] ?? messagesMap[DEFAULT_LOCALE];

export const getDefaultMessages = (): Record<string, string> => messagesMap[DEFAULT_LOCALE];
