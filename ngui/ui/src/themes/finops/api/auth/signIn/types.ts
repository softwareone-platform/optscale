import { ObjectValues } from "utils/types";
import {
  CREATE_TOKEN_STATUS,
  LOGIN_CHALLENGE_STATE,
  LOGIN_METHOD,
  MFA_METHOD_TYPE,
  MFA_VERIFICATION_FAILURE
} from "./constants";

/** A value filling a `%s` in an error's `reason` — the auth service passes strings and numbers. */
export type AuthErrorParam = string | number;

export type MfaMethodType = ObjectValues<typeof MFA_METHOD_TYPE>;

export type LoginChallengeState = ObjectValues<typeof LOGIN_CHALLENGE_STATE>;

export type LoginMethod = ObjectValues<typeof LOGIN_METHOD>;

/** Snake_case throughout: these types describe the auth service payloads verbatim. */
export type MfaMethod = {
  id: string;
  type: MfaMethodType;
  label: string;
  is_default: boolean;
  confirmed: boolean;
};

export type LoginChallenge = {
  challenge_id: string;
  state: LoginChallengeState;
  expires_at: number;
  user_email: string;
  methods: MfaMethod[];
  default_method_id: string | null;
  code_sent: boolean;
  attempts_left: number;
};

export type AuthToken = {
  token: string;
  user_id: string;
  user_email: string;
  created_at: string;
  valid_until: string;
  ip: string;
  digest: string;
};

export type LoginOptions = {
  methods: LoginMethod[];
  /** Reserved for SSO resolution; the shape firms up when SSO lands. */
  sso: { state: string };
};

export type LoginOptionsParams = {
  email: string;
};

export type ResolveLoginOptions = (params: LoginOptionsParams) => Promise<LoginOptions>;

export type CreateTokenParams = {
  email: string;
  password: string;
};

export type CreateTokenResponse =
  | { status: typeof CREATE_TOKEN_STATUS.TOKEN_ISSUED; data: AuthToken }
  | { status: typeof CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED; data: LoginChallenge };

export type CreateToken = (params: CreateTokenParams) => Promise<CreateTokenResponse>;

export type CompleteLoginChallengeParams = {
  challenge_id: string;
  method_id: string;
  code: string;
};

export type CompleteLoginChallenge = (params: CompleteLoginChallengeParams) => Promise<AuthToken>;

export type MfaVerificationFailure =
  | { kind: typeof MFA_VERIFICATION_FAILURE.INVALID_CODE; attemptsLeft: number | null }
  | { kind: typeof MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED }
  | { kind: typeof MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED }
  | { kind: typeof MFA_VERIFICATION_FAILURE.UNEXPECTED };

/** The failures after which this challenge can never succeed — sign-in has to start over. */
export type MfaTerminalFailureReason =
  | typeof MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED
  | typeof MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED;
