import { getApiUrl } from "api/utils";
import { AuthApiError, AuthErrorParam } from "./errors";

const AUTH_API_URL = getApiUrl("auth");

// Parsed JSON is unchecked, so `params` stays `unknown` until `isAuthErrorParams` narrows it.
type AuthErrorEnvelope = {
  error?: {
    error_code?: string;
    reason?: string;
    params?: unknown;
  };
};

type AuthRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** The signed-in user's token; sign-in calls go without one. */
  token?: string;
};

// All or nothing: params are positional (`params[0]` is the attempts left), so dropping one would shift the rest.
const isAuthErrorParams = (value: unknown): value is AuthErrorParam[] =>
  Array.isArray(value) && value.every((param) => typeof param === "string" || typeof param === "number");

/**
 * Returns the HTTP status alongside the body because sign-in branches on it — `201` is a token, `202` a login
 * challenge. A non-2xx answer becomes an {@link AuthApiError} carrying the optscale error envelope, so callers branch
 * on `error_code` rather than on a message.
 */
export const requestAuth = async <TData>(
  path: string,
  { method = "POST", body, token }: AuthRequestOptions = {}
): Promise<{ status: number; data: TData }> => {
  const response = await fetch(`${AUTH_API_URL}${path}`, {
    method,
    headers: {
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  // A `204` has no body, and a gateway can answer a non-JSON one (an HTML error page, an empty 502).
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const { error } = (payload ?? {}) as AuthErrorEnvelope;

    throw new AuthApiError({
      status: response.status,
      errorCode: error?.error_code ?? "",
      reason: error?.reason ?? response.statusText,
      params: isAuthErrorParams(error?.params) ? error.params : []
    });
  }

  return { status: response.status, data: payload as TData };
};

/** `POST` without a token — every sign-in step. */
export const postAuth = <TData>(path: string, body: unknown) => requestAuth<TData>(path, { body });
