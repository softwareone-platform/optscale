import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_LOCALE,
  DRAFT_LOCALES,
  DRAFT_LOCALES_STORAGE_KEY,
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES,
  getStoredLocale,
  getVisibleLocales,
  isLocaleVisible,
  resolveInitialLocale,
  type SupportedLocale
} from "./localeManager";

const draftLocale = [...DRAFT_LOCALES][0] as SupportedLocale; // e.g. "es-ES"
const allLocales = Object.keys(SUPPORTED_LOCALES) as SupportedLocale[];
const publicLocales = allLocales.filter((locale) => !DRAFT_LOCALES.has(locale));

const enablePreview = () => localStorage.setItem(DRAFT_LOCALES_STORAGE_KEY, "true");
const stubBrowserLanguages = (languages: string[]) => vi.stubGlobal("navigator", { languages });

beforeEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("isLocaleVisible", () => {
  it("always shows the default (English) locale", () => {
    expect(isLocaleVisible(DEFAULT_LOCALE)).toBe(true);
    enablePreview();
    expect(isLocaleVisible(DEFAULT_LOCALE)).toBe(true);
  });

  it("hides a draft locale until the preview flag is set", () => {
    expect(isLocaleVisible(draftLocale)).toBe(false);
    enablePreview();
    expect(isLocaleVisible(draftLocale)).toBe(true);
  });
});

describe("getVisibleLocales", () => {
  it("omits draft locales when the preview flag is off", () => {
    expect(getVisibleLocales()).toEqual(publicLocales);
  });

  it("always includes the default locale", () => {
    expect(getVisibleLocales()).toContain(DEFAULT_LOCALE);
  });

  it("returns every locale when the preview flag is on", () => {
    enablePreview();
    expect(getVisibleLocales()).toEqual(allLocales);
  });
});

describe("getStoredLocale", () => {
  it("returns null when nothing is stored", () => {
    expect(getStoredLocale()).toBeNull();
  });

  it("returns null for an unsupported stored value", () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, "xx-YY");
    expect(getStoredLocale()).toBeNull();
  });

  it("returns a stored visible locale", () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, DEFAULT_LOCALE);
    expect(getStoredLocale()).toBe(DEFAULT_LOCALE);
  });

  it("ignores a stored draft locale while it is hidden (can't get stuck)", () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, draftLocale);
    expect(getStoredLocale()).toBeNull();
  });

  it("returns the stored draft locale once preview is enabled", () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, draftLocale);
    enablePreview();
    expect(getStoredLocale()).toBe(draftLocale);
  });
});

describe("resolveInitialLocale", () => {
  it("does NOT auto-select a hidden language from the browser (stays on English)", () => {
    stubBrowserLanguages([draftLocale]);
    expect(resolveInitialLocale()).toBe(DEFAULT_LOCALE);
  });

  it("matches a hidden language by subtag but still stays on English", () => {
    stubBrowserLanguages([draftLocale.split("-")[0]]); // e.g. "es"
    expect(resolveInitialLocale()).toBe(DEFAULT_LOCALE);
  });

  it("auto-selects the browser language once preview is enabled", () => {
    enablePreview();
    stubBrowserLanguages([draftLocale]);
    expect(resolveInitialLocale()).toBe(draftLocale);
  });

  it("prefers a persisted choice over browser detection", () => {
    enablePreview();
    localStorage.setItem(LOCALE_STORAGE_KEY, draftLocale);
    stubBrowserLanguages([DEFAULT_LOCALE]);
    expect(resolveInitialLocale()).toBe(draftLocale);
  });

  it("falls back to English for an unknown browser language", () => {
    stubBrowserLanguages(["xx-YY"]);
    expect(resolveInitialLocale()).toBe(DEFAULT_LOCALE);
  });
});
