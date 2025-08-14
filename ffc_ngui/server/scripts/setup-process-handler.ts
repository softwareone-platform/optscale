import { Logger } from "../utils/logger.js";

export const setupProcessHandlers = () => {
  const shutdown = (signal: string) => {
    Logger.warn(`Received ${signal}, initiating shutdown...`);
    process.exit(0);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  process.on("unhandledRejection", (reason, promise) => {
    Logger.error(
      `Unhandled Promise Rejection at: ${promise}, reason: ${reason}`
    );
    process.exit(1);
  });

  process.on("uncaughtException", (error) => {
    Logger.error(`Uncaught Exception: ${error.message}`);
    process.exit(1);
  });
};
