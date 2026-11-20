import { describe, expect, it } from "vitest";
import { getScenarioOptionLabel, SCENARIO_STATUS } from "./scenarioStatus";

describe("getScenarioOptionLabel", () => {
  it("marks a scenario whose screens are still being built", () => {
    expect(getScenarioOptionLabel("Enforced", { status: SCENARIO_STATUS.IN_PROGRESS, note: "story 04" })).toBe(
      "Enforced · in progress"
    );
  });

  it("leaves a ready scenario's label as it is, note or not", () => {
    expect(getScenarioOptionLabel("Token issued", { status: SCENARIO_STATUS.READY, note: "no Resend yet" })).toBe(
      "Token issued"
    );
  });
});
