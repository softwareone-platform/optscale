import { AuthApiError, AuthErrorParam } from "@theme/api/auth/errors";

/** An error response file: the auth service's envelope, `reason` holding a `%s` per param. */
export type ErrorBody = { error: { status_code: number; error_code: string; reason: string; params: AuthErrorParam[] } };

// Demands every envelope key, so an error file that loses one fails `tsc`.
export const asErrorBody = (body: { error: Record<keyof ErrorBody["error"], unknown> }) => body as ErrorBody;

/** Fills each `%s` in `reason` with the next param, the way the auth service's exceptions do. */
const formatReason = (reason: string, params: AuthErrorParam[]) =>
  params.reduce<string>((formatted, param) => formatted.replace("%s", String(param)), reason);

export const authError = ({ error }: ErrorBody, params: AuthErrorParam[] = error.params) =>
  new AuthApiError({
    status: error.status_code,
    errorCode: error.error_code,
    reason: formatReason(error.reason, params),
    params
  });
