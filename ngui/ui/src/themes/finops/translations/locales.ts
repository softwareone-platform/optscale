import messagesDeDE from "./de-DE/index";
import messagesEnUS from "./en-US/index";
import messagesEsES from "./es-ES/index";
import messagesFrFR from "./fr-FR/index";
import messagesPlPL from "./pl-PL/index";

export const DEFAULT_LOCALE = "en-US";

type LocaleDefinition = {
  label: string;
  messages: Record<string, string>;
  draft?: boolean;
};

const LOCALES = {
  "en-US": { label: "English", messages: messagesEnUS },
  "es-ES": { label: "Español", messages: messagesEsES, draft: true },
  "fr-FR": { label: "Français", messages: messagesFrFR, draft: true },
  "de-DE": { label: "Deutsch", messages: messagesDeDE, draft: true },
  "pl-PL": { label: "Polski", messages: messagesPlPL, draft: true }
} as const satisfies Record<string, LocaleDefinition>;

export type SupportedLocale = keyof typeof LOCALES;

const entries = Object.entries(LOCALES) as [SupportedLocale, LocaleDefinition][];

export const SUPPORTED_LOCALES = Object.fromEntries(entries.map(([code, { label }]) => [code, label])) as Record<
  SupportedLocale,
  string
>;

// Languages hidden from users (and excluded from the completeness gate) until signed off.
export const DRAFT_LOCALES = new Set<SupportedLocale>(entries.filter(([, { draft }]) => draft).map(([code]) => code));

if (DRAFT_LOCALES.has(DEFAULT_LOCALE)) {
  throw new Error(`DEFAULT_LOCALE "${DEFAULT_LOCALE}" must never be marked draft.`);
}

const messagesMap = Object.fromEntries(entries.map(([code, { messages }]) => [code, messages])) as Record<
  SupportedLocale,
  Record<string, string>
>;

export const getMessagesForLocale = (locale: SupportedLocale): Record<string, string> =>
  messagesMap[locale] ?? messagesMap[DEFAULT_LOCALE];

export const getDefaultMessages = (): Record<string, string> => messagesMap[DEFAULT_LOCALE];
