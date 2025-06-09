export type TODO = unknown;

export type PickRename<T, R extends { [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T" }> = {
  [P in keyof T as P extends keyof R ? R[P] : P]: T[P];
};

export type ObjectKeys<T extends Record<string, unknown>> = keyof T;

export type ObjectValues<T extends Record<string, unknown>> = T[ObjectKeys<T>];

export type ArrayValues<T extends readonly unknown[]> = T[number];

/**
 * ExclusiveUnion<T> takes a record of keys and their types
 * and produces a union where exactly one key is allowed at a time.
 *
 * Example:
 * type Props = ExclusiveUnion<{
 *   foo: string;
 *   bar: number;
 *   baz: boolean;
 * }>;
 *
 * Valid:
 *   { foo: "hello" }
 *   { bar: 123 }
 *   { baz: true }
 *
 * Invalid:
 *   { foo: "hi", bar: 42 } // ❌ Only one key allowed
 *   {}                     // ❌ At least one key required
 */
export type ExclusiveUnion<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    [P in K]: T[P]; // include the selected key
  } & {
    [P in Exclude<keyof T, K>]?: never; // forbid all others
  };
}[keyof T];
