import { Route, useNavigate } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { LoginChallenge } from "api/auth/signIn/types";
import { click, find } from "tests/dom";
import LandingPage from "tests/LandingPage";
import { renderWithProviders } from "tests/renderWithProviders";
import { ENROLLMENT_REQUIRED_CHALLENGE, MFA_REQUIRED_CHALLENGE } from "tests/signInFixtures";
import { MFA_CHALLENGE, MFA_ENROLLMENT } from "urls";
import { ChallengeContinuation, useStartLoginChallenge } from "./useLoginChallenge";

const START = "/start";

type StartOptions = Parameters<ReturnType<typeof useStartLoginChallenge>>[1];

const StartPage = ({ challenge, options }: { challenge: LoginChallenge; options: StartOptions }) => {
  const startLoginChallenge = useStartLoginChallenge();

  return <button data-test-id="btn_start" onClick={() => startLoginChallenge(challenge, options)} />;
};

const ChallengePage = ({ testId }: { testId: string }) => {
  const navigate = useNavigate();

  return (
    <>
      <LandingPage testId={testId} />
      <button data-test-id="btn_browser_back" onClick={() => navigate(-1)} />
    </>
  );
};

let unmount: () => void;

const start = async (challenge: LoginChallenge, options?: StartOptions) => {
  ({ unmount } = renderWithProviders({
    initialEntry: START,
    routes: (
      <>
        <Route path={START} element={<StartPage challenge={challenge} options={options} />} />
        <Route path={MFA_CHALLENGE} element={<ChallengePage testId="mfa_page" />} />
        <Route path={MFA_ENROLLMENT} element={<ChallengePage testId="mfa_enrollment_page" />} />
      </>
    ),
  }));

  await click("btn_start");
};

const arrivedState = (testId: string) => JSON.parse(find(testId)!.dataset.state!);

describe("useStartLoginChallenge", () => {
  afterEach(() => unmount());

  it.each([
    { name: "the MFA step for a user with methods", challenge: MFA_REQUIRED_CHALLENGE, testId: "mfa_page" },
    {
      name: "the enforced setup for a user without any",
      challenge: ENROLLMENT_REQUIRED_CHALLENGE,
      testId: "mfa_enrollment_page",
    },
  ])("opens $name, handing it the challenge", async ({ challenge, testId }) => {
    await start(challenge);

    expect(arrivedState(testId)).toEqual({ challenge });
  });

  it("hands over where a passed challenge leads", async () => {
    const continuation: ChallengeContinuation = { returnsToPasswordRecovery: true, search: "?capability=finops" };

    await start(MFA_REQUIRED_CHALLENGE, { continuation });

    expect(arrivedState("mfa_page")).toEqual({ challenge: MFA_REQUIRED_CHALLENGE, continuation });
  });

  it("keeps the starting page one Back away by default", async () => {
    await start(MFA_REQUIRED_CHALLENGE);

    await click("btn_browser_back");

    expect(find("btn_start")).not.toBeNull();
  });

  it("takes the starting page's place in history when asked to replace it", async () => {
    await start(MFA_REQUIRED_CHALLENGE, { replace: true });

    await click("btn_browser_back");

    expect(find("btn_start")).toBeNull();
    expect(find("mfa_page")).not.toBeNull();
  });
});
