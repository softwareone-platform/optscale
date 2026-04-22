/**
 * Shape of a single API-route interception entry consumed by `apiInterceptors`.
 *
 * Exactly one of `gql` (GraphQL operation name) or `url` (REST path regex)
 * must be supplied per entry — the `XOR` keeps that mutually-exclusive shape
 * enforceable at compile time.
 */

type XOR<T, U> =
  | (T & { [K in Exclude<keyof U, keyof T>]?: never })
  | (U & { [K in Exclude<keyof T, keyof U>]?: never });

export type GraphQLInterceptionEntry = { gql: string; mock: unknown };
export type RESTInterceptionEntry = { url: string; mock: unknown };

export type InterceptionEntry = XOR<GraphQLInterceptionEntry, RESTInterceptionEntry>;
