/** Whether the screens a scenario leads to are built, or the mock answers ahead of a UI still in progress. */
export const SCENARIO_STATUS = Object.freeze({
  READY: "ready",
  IN_PROGRESS: "in_progress"
} as const);

export type ScenarioStatusInfo =
  | { status: typeof SCENARIO_STATUS.READY; note?: string }
  // In progress always says what is missing and which story builds it.
  | { status: typeof SCENARIO_STATUS.IN_PROGRESS; note: string };

/** A native `<option>` cannot be styled, so the status goes into its text. */
export const getScenarioOptionLabel = (label: string, { status }: ScenarioStatusInfo) =>
  status === SCENARIO_STATUS.IN_PROGRESS ? `${label} · in progress` : label;
