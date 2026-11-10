import type { Page } from '@playwright/test';

/** Class taking a Playwright `Page` in its constructor. */
type PageObjectConstructor<T = unknown> = new (page: Page) => T;

/** Async factory shape Playwright expects for fixtures. */
type PageObjectFixtureFactory<T> = (
  args: { page: Page },
  use: (pageObject: T) => Promise<void>,
) => Promise<void>;

/** Maps a constructor map to its instance-type map (what tests see). */
export type FixtureInstances<Constructors extends Record<string, PageObjectConstructor>> = {
  [Name in keyof Constructors]: InstanceType<Constructors[Name]>;
};

/**
 * PascalCase → camelCase keys.
 *
 * Note: `Uncapitalize<…>` only lowercases the first character, so `URLPage`
 * is typed as `uRLPage` though `toCamelCase` produces `urlPage` at runtime.
 * Prefer single-leading-capital class names (e.g. `UrlPage`).
 */
type CamelCasedConstructors<Constructors extends Record<string, PageObjectConstructor>> = {
  [Name in keyof Constructors & string as Uncapitalize<Name>]: Constructors[Name];
};

/**
 * PascalCase → camelCase, preserving leading acronyms:
 * `HomePage` → `homePage`, `URLPage` → `urlPage`, `URL` → `url`.
 */
function toCamelCase(name: string): string {
  if (name.length === 0) return name;
  const match = /^[A-Z]+/.exec(name);
  if (!match) return name;
  const acronym = match[0];
  if (acronym.length === 1) return name.charAt(0).toLowerCase() + name.slice(1);
  if (acronym.length === name.length) return acronym.toLowerCase();
  // Keep the last capital of the acronym run as the start of the next word.
  return acronym.slice(0, -1).toLowerCase() + name.slice(acronym.length - 1);
}

/**
 * Lower-cases each key for Playwright's fixture layer. Non-function entries
 * are dropped so stray constants don't become broken fixtures.
 */
export function toFixtureMap<Namespace extends Record<string, PageObjectConstructor>>(
  namespace: Namespace,
): CamelCasedConstructors<Namespace> {
  const fixtureMap = {} as Record<string, PageObjectConstructor>;

  for (const exportName in namespace) {
    const exported = namespace[exportName];
    if (typeof exported !== 'function') continue;

    fixtureMap[toCamelCase(exportName)] = exported;
  }

  return fixtureMap as CamelCasedConstructors<Namespace>;
}

/** Wraps each constructor in a fixture factory so the map can be spread into `base.extend`. */
export function buildFixtures<Constructors extends Record<string, PageObjectConstructor>>(
  constructors: Constructors,
): { [Name in keyof Constructors]: PageObjectFixtureFactory<InstanceType<Constructors[Name]>> } {
  type Factories = {
    [Name in keyof Constructors]: PageObjectFixtureFactory<InstanceType<Constructors[Name]>>;
  };

  const factories = {} as Factories;

  for (const name in constructors) {
    const PageObject = constructors[name];
    factories[name] = (async ({ page }, use) => {
      await use(new PageObject(page) as InstanceType<Constructors[typeof name]>);
    }) as Factories[typeof name];
  }

  return factories;
}
