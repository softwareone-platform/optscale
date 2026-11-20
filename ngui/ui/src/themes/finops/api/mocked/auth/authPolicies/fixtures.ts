import { AuthPolicy } from "@theme/api/auth/authPolicies/types";
import { asErrorBody } from "@theme/api/mocked/errorBodies";
import created from "@theme/api/mocked/responses/auth/v2/auth_policies/201-created.json";
import invalidValue from "@theme/api/mocked/responses/auth/v2/auth_policies/400-invalid-value.json";
import tokenRequired from "@theme/api/mocked/responses/auth/v2/auth_policies/401-token-required.json";
import forbidden from "@theme/api/mocked/responses/auth/v2/auth_policies/403-forbidden.json";
import notFound from "@theme/api/mocked/responses/auth/v2/auth_policies/404-not-found.json";
import organizationNotFound from "@theme/api/mocked/responses/auth/v2/auth_policies/404-organization-not-found.json";
import authPolicyExists from "@theme/api/mocked/responses/auth/v2/auth_policies/409-auth-policy-exists.json";

/**
 * The typed side of `responses/auth/v2/auth_policies/`, shaped as the auth service answers.
 * Loaders demand every contract key — see `auth/signIn/fixtures.ts`.
 */

const asAuthPolicy = (body: Record<keyof AuthPolicy, unknown>) => body as AuthPolicy;

export const CREATED_POLICY_BODY = asAuthPolicy(created);

// Keys match `AUTH_ERROR_CODE`'s, so `fixtures.test.ts` can pair each file with its code.
export const ERROR_BODY = Object.freeze({
  INVALID_VALUE: asErrorBody(invalidValue),
  TOKEN_REQUIRED: asErrorBody(tokenRequired),
  FORBIDDEN: asErrorBody(forbidden),
  NOT_FOUND: asErrorBody(notFound),
  RESOURCE_NOT_FOUND: asErrorBody(organizationNotFound),
  AUTH_POLICY_EXISTS: asErrorBody(authPolicyExists)
});
