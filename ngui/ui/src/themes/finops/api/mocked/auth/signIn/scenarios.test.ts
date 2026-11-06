import { describe, expect, it } from "vitest";
import { SIGN_IN_SCENARIO, SIGN_IN_SCENARIO_GROUPS } from "./scenarios";

describe("SIGN_IN_SCENARIO_GROUPS", () => {
  it("offers every scenario in the dev panel picker exactly once", () => {
    const grouped = SIGN_IN_SCENARIO_GROUPS.flatMap(({ scenarios }) => scenarios);

    expect([...grouped].sort()).toEqual(Object.values(SIGN_IN_SCENARIO).sort());
  });
});
