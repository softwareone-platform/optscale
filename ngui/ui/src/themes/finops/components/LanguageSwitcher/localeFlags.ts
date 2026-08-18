import deFlag from "@theme/assets/flags/de.svg";
import esFlag from "@theme/assets/flags/es.svg";
import frFlag from "@theme/assets/flags/fr.svg";
import plFlag from "@theme/assets/flags/pl.svg";
import usFlag from "@theme/assets/flags/us.svg";
import { type SupportedLocale } from "@theme/translations/localeManager";

/**
 * Flags are local SVGs rather than emoji: emoji glyphs differ per platform and the Linux container
 * used for visual regression has no flag-emoji font, which would render them as tofu boxes.
 */
export const LOCALE_FLAGS: Record<SupportedLocale, string> = {
  "en-US": usFlag,
  "es-ES": esFlag,
  "fr-FR": frFlag,
  "de-DE": deFlag,
  "pl-PL": plFlag
};
