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

/** Maps a PascalCase-keyed map to a camelCase-keyed one. */
type CamelCasedConstructors<Constructors extends Record<string, PageObjectConstructor>> = {
  [Name in keyof Constructors & string as Uncapitalize<Name>]: Constructors[Name];
};

/**
 * Lower-cases each key so `pages/index.ts` can feed Playwright's fixture layer.
 * Non-function entries are dropped to prevent stray constants becoming broken fixtures.
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
