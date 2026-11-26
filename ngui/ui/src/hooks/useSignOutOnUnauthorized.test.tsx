import { Route } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthApiError } from "api/auth/errors";
import { click, find } from "tests/dom";
import { renderWithProviders } from "tests/renderWithProviders";
import { useSignOutOnUnauthorized } from "./useSignOutOnUnauthorized";

const signOutSpy = vi.fn();

vi.mock("utils/api", () => ({ signOut: (...args: unknown[]) => signOutSpy(...args) }));

const rejection = (status: number) => new AuthApiError({ status, errorCode: "", reason: "refused" });

const Caller = ({ error }: { error: AuthApiError }) => {
  const signOutOnUnauthorized = useSignOutOnUnauthorized();

  return (
    <button
      data-test-id="btn_call"
      onClick={async (event) => {
        const button = event.currentTarget;

        // The rejection still reaches the caller, which shows it here.
        await signOutOnUnauthorized(Promise.reject(error)).catch((caught: AuthApiError) => {
          button.dataset.rejectedWith = String(caught.status);
        });
      }}
    />
  );
};

let unmount: () => void;

const call = async (error: AuthApiError) => {
  ({ unmount } = renderWithProviders({ initialEntry: "/", routes: <Route path="/" element={<Caller error={error} />} /> }));

  await click("btn_call");
};

describe("useSignOutOnUnauthorized", () => {
  afterEach(() => {
    unmount();
    vi.clearAllMocks();
  });

  it("signs out when the service no longer accepts the session's token", async () => {
    await call(rejection(401));

    expect(signOutSpy).toHaveBeenCalledTimes(1);
    expect(find("btn_call")?.dataset.rejectedWith).toBe("401");
  });

  it("keeps the session on a refusal that is not about the token", async () => {
    await call(rejection(403));

    expect(signOutSpy).not.toHaveBeenCalled();
    expect(find("btn_call")?.dataset.rejectedWith).toBe("403");
  });
});
