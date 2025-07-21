#!/usr/bin/env node

import fs from "fs";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { Logger } from "../utils/logger.js";
import { setupProcessHandlers } from "./setup-process-handler.js";

const main = async () => {
  setupProcessHandlers();

  // Load and expand environment variables
  if (fs.existsSync(".env")) {
    const myEnv = dotenv.config();
    dotenvExpand.expand(myEnv);
    Logger.info("Environment variables loaded and expanded");
  } else {
    throw new Error(".env file is required but not found");
  }

  // Import and start the server
  await import("../server.js");
};

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    Logger.error(`Fatal error: ${error.message}`);
    process.exit(1);
  });
}
