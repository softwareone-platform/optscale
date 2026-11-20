import { AuthApiError } from "api/auth/errors";
import { SecurityScenario } from "api/mocked/auth/mfaMethods/scenarios";
import { SignInScenario } from "api/mocked/auth/signIn/scenarios";
import { authError, ErrorBody } from "api/mocked/errorBodies";

export type MockedResponse = {
  status: number;
  /** `undefined` answers without a body, as a `204` must. */
  body: unknown;
};

/** What the plugin passes on from the incoming request. */
export type MockedRequest = {
  body: Record<string, unknown>;
  query: Record<string, string>;
  authorization: string;
};

export type RouteRequest = MockedRequest & {
  params: Record<string, string>;
  /** What the dev panel picked, read once from the request's cookies. */
  scenarios: { signIn: SignInScenario; security: SecurityScenario };
};

export type RouteHandler = (request: RouteRequest) => Promise<MockedResponse>;

export type MockedRoute = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  /** As the auth service sees it, without the dev `/api` prefix; `:name` segments are path parameters. */
  path: string;
  handle: RouteHandler;
  /**
   * Still mocked under the real sign-in scenario, which otherwise sends every route to the real auth service:
   * the mock's own routes, and `login_options`, which the service only has on its MFA branch.
   */
  answersRealSignIn?: true;
  /** The mock's own bookkeeping, not a call the service would take time over. */
  skipsLatency?: true;
};

export const ok = (body: unknown): MockedResponse => ({ status: 200, body });

export const created = (body: unknown): MockedResponse => ({ status: 201, body });

export const noContent = (): MockedResponse => ({ status: 204, body: undefined });

// The body and query are untrusted JSON; the service checks types the same way, field by field.
export const readString = (value: unknown) => (typeof value === "string" ? value : "");

const readBearerToken = (authorization: string) => authorization.match(/^Bearer (.+)$/)?.[1] ?? "";

export const readToken = ({ authorization }: Pick<RouteRequest, "authorization">) => readBearerToken(authorization);

export const readSignedInUser = ({ authorization, params }: Pick<RouteRequest, "authorization" | "params">) => ({
  token: readBearerToken(authorization),
  userId: params.user_id
});

/** A reader that narrows a wire value to one of a contract's enum values, or answers `400 OA0060` naming the field. */
export const enumReader =
  <TValue extends string>(values: Readonly<Record<string, TValue>>, field: string, invalidValueBody: ErrorBody) =>
  (value: unknown): TValue => {
    const isKnownValue = (candidate: unknown): candidate is TValue => Object.values<unknown>(values).includes(candidate);

    if (!isKnownValue(value)) {
      throw authError(invalidValueBody, [field]);
    }

    return value;
  };

/** The path parameters when `path` fits `pattern`, else `null`. */
const matchPath = (pattern: string, path: string) => {
  const patternSegments = pattern.split("/");
  const pathSegments = path.split("/");

  if (patternSegments.length !== pathSegments.length) {
    return null;
  }

  const params: Record<string, string> = {};

  const isMatch = patternSegments.every((segment, index) => {
    if (segment.startsWith(":")) {
      params[segment.slice(1)] = decodeURIComponent(pathSegments[index]);
      return true;
    }

    return segment === pathSegments[index];
  });

  return isMatch ? params : null;
};

export const matchRoute = (routes: MockedRoute[], { method, path }: { method: string; path: string }) => {
  for (const route of routes) {
    const params = route.method === method ? matchPath(route.path, path) : null;

    if (params) {
      return { route, params };
    }
  }

  return undefined;
};

/** Rebuilds the optscale error envelope the real service would have sent over the wire. */
export const toErrorResponse = (error: unknown): MockedResponse => {
  if (error instanceof AuthApiError) {
    return {
      status: error.status,
      body: { error: { status_code: error.status, error_code: error.errorCode, reason: error.message, params: error.params } }
    };
  }

  throw error;
};
