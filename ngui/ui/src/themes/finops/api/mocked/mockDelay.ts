/** Every mocked auth call waits this long, so the pending states are visible while clicking through. */
export const MOCK_LATENCY_MS = 600;

export const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
