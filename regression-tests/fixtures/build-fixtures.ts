import type { Page } from '@playwright/test';

/** A class that takes a Playwright `Page` in its constructor. */
export type PageObjectConstructor<T = unknown> = new (page: Page) => T;

/** The async factory shape Playwright expects for every fixture. */
export type PageObjectFixtureFactory<T> = (
  args: { page: Page },
  use: (pageObject: T) => Promise<void>,
) => Promise<void>;

/** Turns a constructor map into its instance-type map (what tests see). */
export type FixtureInstances<Constructors extends Record<string, PageObjectConstructor>> = {
  [Name in keyof Constructors]: InstanceType<Constructors[Name]>;
};

/** Turns a PascalCase-keyed map into a camelCase-keyed one. */
export type CamelCasedConstructors<Constructors extends Record<string, PageObjectConstructor>> = {
  [Name in keyof Constructors & string as Uncapitalize<Name>]: Constructors[Name];
};

/**
 * Lower-cases the first letter of every key so `pages/index.ts` can feed
 * directly into Playwright's fixture layer. Non-function entries are dropped
 * so a stray helper constant can't become a broken fixture.
 */
export function toFixtureMap<Namespace extends Record<string, PageObjectConstructor>>(
  namespace: Namespace,
): CamelCasedConstructors<Namespace> {
  const fixtureMap = {} as Record<string, PageObjectConstructor>;

  for (const exportName in namespace) {
    const exported = namespace[exportName];
    if (typeof exported !== 'function') continue;

    const fixtureName = exportName.charAt(0).toLowerCase() + exportName.slice(1);
    fixtureMap[fixtureName] = exported;
  }

  return fixtureMap as CamelCasedConstructors<Namespace>;
}

/**
 * Wraps each constructor in a fixture factory so the whole map can be
 * spread into `base.extend`.
 */
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
