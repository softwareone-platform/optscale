import enTranslations from "translations/en-US/app.json";
import enErrors from "translations/en-US/errors.json";

const sortTranslations = (translations: Record<string, string>) =>
  Object.fromEntries(
    Object.keys(translations)
      .toSorted()
      .map((key) => [key, translations[key]])
  );

const stringifyTranslations = (translations: Record<string, string>) => JSON.stringify(translations, null, 2);

const testTranslationSorting = (translations: Record<string, string>) => {
  const orderedTranslations = sortTranslations(translations);

  const stringifiedTranslations = stringifyTranslations(translations);
  const stringifiedOrderedTranslations = stringifyTranslations(orderedTranslations);

  expect(stringifiedTranslations).toEqual(stringifiedOrderedTranslations);
};

describe("Translation sorting", () => {
  it("should sort English app translations alphabetically by key", () => {
    testTranslationSorting(enTranslations);
  });

  it("should sort English errors translations alphabetically by key", () => {
    testTranslationSorting(enErrors);
  });
});
