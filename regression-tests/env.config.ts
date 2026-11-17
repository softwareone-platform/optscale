export const ENVIRONMENT_KEYS = ['dev', 'prerelease', 'staging', 'prod'] as const;

export type EnvironmentKey = (typeof ENVIRONMENT_KEYS)[number];

export type TokenVar = `TEST_ACCOUNT_TOKEN_${Uppercase<EnvironmentKey>}`;

type HttpsUrl = `https://${string}`;
type PlainHttpUrl = `http://${string}`;

type Definition<Key extends EnvironmentKey, Url extends string> = {
  /** Environments sharing a key share a deployment: one token, one session, one set of screenshots. */
  key: Key;
  baseUrl: Url;
  apiBaseUrl: Url;
  tokenVar: TokenVar;
};

// Only `dev` is served from localhost, so it alone may use plain HTTP.
export type EnvironmentDefinition = Definition<'dev', HttpsUrl | PlainHttpUrl> | Definition<Exclude<EnvironmentKey, 'dev'>, HttpsUrl>;

export const ENVIRONMENTS = {
  local: {
    key: 'dev',
    baseUrl: 'http://localhost:3000',
    apiBaseUrl: 'https://api.finops.s1.today',
    tokenVar: 'TEST_ACCOUNT_TOKEN_DEV',
  },
  dev: {
    key: 'dev',
    baseUrl: 'http://localhost:4000',
    apiBaseUrl: 'https://api.finops.s1.today',
    tokenVar: 'TEST_ACCOUNT_TOKEN_DEV',
  },
  prerelease: {
    key: 'prerelease',
    baseUrl: 'https://portal.finops.s1.show',
    apiBaseUrl: 'https://api.finops.s1.show',
    tokenVar: 'TEST_ACCOUNT_TOKEN_PRERELEASE',
  },
  staging: {
    key: 'staging',
    baseUrl: 'https://portal.finops.s1.live',
    apiBaseUrl: 'https://api.finops.s1.live',
    tokenVar: 'TEST_ACCOUNT_TOKEN_STAGING',
  },
  prod: {
    key: 'prod',
    baseUrl: 'https://portal.finops.softwareone.com',
    apiBaseUrl: 'https://api.finops.softwareone.com',
    tokenVar: 'TEST_ACCOUNT_TOKEN_PROD',
  },
} as const satisfies Record<string, EnvironmentDefinition>;

export type TestEnv = keyof typeof ENVIRONMENTS;

const BARE_ORIGIN_PATTERN = /^https?:\/\/[a-z0-9]([a-z0-9.-]*[a-z0-9])?(?::\d{1,5})?$/i;

const tokenVarFor = (key: EnvironmentKey): TokenVar => `TEST_ACCOUNT_TOKEN_${key.toUpperCase() as Uppercase<EnvironmentKey>}`;

export const isBareOrigin = (value: string): boolean => BARE_ORIGIN_PATTERN.test(value);

// Runs at import time so a malformed definition stops the run before the first test.
function assertEnvironmentsAreValid(): void {
  const problems: string[] = [];
  const seenByKey = new Map<EnvironmentKey, { name: string; definition: EnvironmentDefinition }>();

  for (const [name, definition] of Object.entries(ENVIRONMENTS) as [string, EnvironmentDefinition][]) {
    for (const field of ['baseUrl', 'apiBaseUrl'] as const) {
      const url = definition[field];
      if (!isBareOrigin(url)) {
        problems.push(`${name}.${field} must be scheme://host[:port] with no trailing slash — got "${url}"`);
      } else if (definition.key !== 'dev' && !url.startsWith('https://')) {
        problems.push(`${name}.${field} must use https:// — only the "dev" key may use http:// — got "${url}"`);
      }
    }
    // The type only narrows this to *some* known token var, so a var belonging to another key would
    // typecheck and then authenticate the run against the wrong cluster.
    if (definition.tokenVar !== tokenVarFor(definition.key)) {
      problems.push(
        `${name}.tokenVar must be ${tokenVarFor(definition.key)} to match key "${definition.key}" — got "${definition.tokenVar}"`
      );
    }

    const twin = seenByKey.get(definition.key);
    if (!twin) {
      seenByKey.set(definition.key, { name, definition });
      continue;
    }
    if (twin.definition.apiBaseUrl !== definition.apiBaseUrl) {
      problems.push(
        `${name} and ${twin.name} share key "${definition.key}" but call different APIs ` +
          `("${definition.apiBaseUrl}" vs "${twin.definition.apiBaseUrl}") — they cannot share baselines`
      );
    }
  }

  if (problems.length > 0) {
    throw new Error(`Invalid environment definitions in env.config.ts:\n  - ${problems.join('\n  - ')}`);
  }
}

assertEnvironmentsAreValid();
