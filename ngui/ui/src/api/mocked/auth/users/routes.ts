import { MockedRoute, ok, readSignedInUser, readString } from "api/mocked/http/router";
import { updateUserPasswordMock } from "./updateUserPasswordMock";

export const USERS_ROUTES: MockedRoute[] = [
  {
    method: "PATCH",
    path: "/auth/v2/users/:user_id",
    handle: async (request) =>
      ok(await updateUserPasswordMock({ ...readSignedInUser(request), password: readString(request.body.password) }))
  }
];
