import { getCurrentUTCTimeInSec } from "utils/datetime";
import { mockState, RealSession } from "./mockState";

/** What the dev panel is told about the stored session — never the token itself. */
export type RealSessionStatus = {
  session: (Omit<RealSession, "token"> & { captured_at: number }) | null;
};

export const storeRealSession = ({ token, user_id, user_email }: RealSession, nowSeconds = getCurrentUTCTimeInSec()) => {
  mockState.realSession = { token, user_id, user_email, captured_at: nowSeconds };
};

export const findRealSession = (): RealSession | null => mockState.realSession;

export const forgetRealSession = () => {
  mockState.realSession = null;
};

export const getRealSessionStatus = (): RealSessionStatus => {
  if (!mockState.realSession) {
    return { session: null };
  }

  const { user_id, user_email, captured_at } = mockState.realSession;

  return { session: { user_id, user_email, captured_at } };
};
