
/** XOR helper so a config must be either GraphQL or REST, not both */
type XOR<T, U> =
  | (T & { [K in Exclude<keyof U, keyof T>]?: never })
  | (U & { [K in Exclude<keyof T, keyof U>]?: never });

/**
 * Represents a GraphQL interception entry.
 *
 * @property {string} gql - The name of the GraphQL operation to intercept.
 * @property {any} mock - The mock data to return when the specified GraphQL operation is intercepted.
 * @property {object} [variableMatch] - Optional key-value pairs to match against GraphQL variables.
 */
type IGraphQLEntry = {
  gql: string;
  mock: any;
  variableMatch?: Record<string, any>;
};

/**
 * Represents a REST API interception entry.
 *
 * @property {string} url - The URL pattern to intercept.
 * @property {any} mock - The mock data to return when the specified URL is intercepted.
 */
type IRESTEntry = {
  url: string;
  mock: any;
};

/**
 * Represents an API interception entry, which can be either a GraphQL or REST entry.
 *
 * This type uses the XOR utility type to ensure that an entry is either a GraphQL entry or a REST entry, but not both.
 *
 * @property {string} [gql] - The name of the GraphQL operation to intercept (if applicable).
 * @property {string} [url] - The URL pattern to intercept (if applicable).
 * @property {any} mock - The mock data to return when the specified operation or URL is intercepted.
 */
export type InterceptionEntry = XOR<IGraphQLEntry, IRESTEntry>;
