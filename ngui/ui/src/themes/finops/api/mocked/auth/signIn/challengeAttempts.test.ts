import { describe, expect, it } from "vitest";
import { AUTH_ERROR_CODE } from "@theme/api/auth/errors";
import {
  confirmChallengeEnrollmentMock,
  startChallengeEnrollmentMock
} from "@theme/api/mocked/auth/mfaMethods/challengeEnrollmentMock";
import { MOCK_MFA, MOCK_SIGN_IN_CREDENTIALS } from "@theme/api/mocked/config";
import { storeChallenge } from "@theme/api/mocked/state/challenges";
import { completeLoginChallengeMock } from "./completeLoginChallengeMock";
import { CHALLENGE_BODY, issueChallenge, TOTP_METHOD_ID } from "./fixtures";

/**
 * Its own file because the user's failure log outlives any one challenge: every mocked sign-in is the same user, so
 * a spec sharing a file with these would be refused for the next 15 minutes.
 */

const signIn = (body = CHALLENGE_BODY.MFA_TOTP_DEFAULT) => {
  const challenge = issueChallenge(body, MOCK_SIGN_IN_CREDENTIALS.email);

  storeChallenge(challenge);

  return challenge;
};

const verify = (challengeId: string, code: string) =>
  completeLoginChallengeMock({ challenge_id: challengeId, method_id: TOTP_METHOD_ID, code }).catch((error) => error);

const startEnrollment = ({ user_id, challenge_id }: ReturnType<typeof signIn>) =>
  startChallengeEnrollmentMock({ userId: user_id, challengeId: challenge_id, type: "totp" }).catch((error) => error);

describe("the limits on MFA codes across a user's challenges", () => {
  it("refuses another sign-in's enrollment once one of the user's challenges enrolled a method", async () => {
    const [first, second] = [signIn(CHALLENGE_BODY.ENROLLMENT_REQUIRED), signIn(CHALLENGE_BODY.ENROLLMENT_REQUIRED)];
    const { id } = await startChallengeEnrollmentMock({ userId: first.user_id, challengeId: first.challenge_id, type: "totp" });
    await confirmChallengeEnrollmentMock({
      userId: first.user_id,
      challengeId: first.challenge_id,
      methodId: id,
      code: MOCK_SIGN_IN_CREDENTIALS.mfaCode
    });

    const refused = await startEnrollment(second);
    const later = await startEnrollment(signIn(CHALLENGE_BODY.ENROLLMENT_REQUIRED));

    expect(refused).toMatchObject({ errorCode: AUTH_ERROR_CODE.MFA_ALREADY_ENROLLED });
    expect(later).toMatchObject({ confirmed: false });
  });

  // Last in the file: from here on the user stays refused.
  it("refuses every code, the right one too, once the user's wrong codes reach the limit across challenges", async () => {
    const attemptsPerChallenge = CHALLENGE_BODY.MFA_TOTP_DEFAULT.attempts_left;
    const lockedChallenges = Array.from({ length: MOCK_MFA.USER_FAILED_ATTEMPTS_LIMIT / attemptsPerChallenge }, () => signIn());
    for (const { challenge_id } of lockedChallenges) {
      for (let attempt = 0; attempt < attemptsPerChallenge; attempt += 1) {
        await verify(challenge_id, "000000");
      }
    }

    const refused = await verify(signIn().challenge_id, MOCK_SIGN_IN_CREDENTIALS.mfaCode);

    expect(refused).toMatchObject({ errorCode: AUTH_ERROR_CODE.TOO_MANY_FAILED_ATTEMPTS });
  });
});
