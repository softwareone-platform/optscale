import { performance } from "perf_hooks";

export const formatDuration = (ms: number) => {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`;
  }
  if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)}s`;
  }
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}m ${seconds}s`;
};

export const createTimeTracker = () => {
  const startTime = performance.now();
  return {
    stop: () => performance.now() - startTime,
  };
};
