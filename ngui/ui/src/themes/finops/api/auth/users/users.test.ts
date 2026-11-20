import { describe, expect, it, vi } from "vitest";
import { updateUserPassword } from "./users";

const mockRequestAuth = vi.fn();

vi.mock("../request", () => ({ requestAuth: (path: string, options: unknown) => mockRequestAuth(path, options) }));

describe("updateUserPassword", () => {
  it("patches only the password on the user, as that user", async () => {
    mockRequestAuth.mockResolvedValue({ status: 200, data: { id: "9c2a" } });

    const user = await updateUserPassword({ token: "MDAxY", userId: "9c2a/x", password: "n3w-Passw0rd" });

    expect(mockRequestAuth).toHaveBeenCalledWith("/users/9c2a%2Fx", {
      method: "PATCH",
      body: { password: "n3w-Passw0rd" },
      token: "MDAxY"
    });
    expect(user).toEqual({ id: "9c2a" });
  });
});
