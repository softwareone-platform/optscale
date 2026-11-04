import { useEffect, useSyncExternalStore } from "react";
import { MfaChallengeStage } from "./types";

// Module-level so the dev panel, rendered outside the challenge's tree, can read the current stage.
let currentStage: MfaChallengeStage | null = null;

const listeners = new Set<() => void>();

const publishStage = (stage: MfaChallengeStage | null) => {
  currentStage = stage;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const useMfaChallengeStage = () => useSyncExternalStore(subscribe, () => currentStage);

export const useReportMfaChallengeStage = (stage: MfaChallengeStage) => {
  // Keyed by content, not identity: the stage object is rebuilt on every render.
  const stageKey = JSON.stringify(stage);

  useEffect(() => {
    publishStage(JSON.parse(stageKey));

    return () => publishStage(null);
  }, [stageKey]);
};
