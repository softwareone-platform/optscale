import { getApiUrl } from "api/utils";
import { AuthApiError } from "./errors";
import { AuthErrorParam } from "./types";

const AUTH_API_URL = getApiUrl("auth");

// Parsed JSON is unchecked, so `params` stays `unknown` until `isAuthErrorParams` narrows it.
type AuthErrorEnvelope = {
  error?: {
    error_code?: string;
    reason?: string;
    params?: unknown;
  };
};

// All or nothing: params are positional (`params[0]` is the attempts left), so dropping one would shift the rest.
const isAuthErrorParams = (value: unknown): value is AuthErrorParam[] =>
  Array.isArray(value) && value.every((param) => typeof param === "string" || typeof param === "number");

/**
 * `POST` against the auth service.
 *
 * Returns the HTTP status alongside the body because sign-in branches on it — `201` is a token,
 * `202` is a login challenge. A non-2xx answer is turned into an {@link AuthApiError} carrying
 * the optscale error envelope, so callers branch on `error_code` rather than on a message.
 */
export const postAuth = async <TData>(path: string, body: unknown): Promise<{ status: number; data: TData }> => {
  const response = await fetch(`${AUTH_API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  // A gateway can answer a non-JSON body (an HTML error page, an empty 502).
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
