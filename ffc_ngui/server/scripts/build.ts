import { Logger } from "../utils/logger.js";
import { SequentialCommandOrchestrator } from "./sequential-command-orchestrator.js";
import { setupProcessHandlers } from "./setup-process-handler.js";

const CONFIG = {
  commands: {
    compile: {
      cmd: "pnpm",
      args: ["compile"],
      description: "TypeScript compilation",
    },
    codegen: { cmd: "pnpm", args: ["codegen"], description: "GraphQL codegen" },
  },
  processName: "Build process",
};

const main = async () => {
  setupProcessHandlers();

  const orchestrator = new SequentialCommandOrchestrator({
    processName: CONFIG.processName,
  })
    .addStep(
      CONFIG.commands.compile.description,
      CONFIG.commands.compile.cmd,
      CONFIG.commands.compile.args
    )
    .addStep(
      CONFIG.commands.codegen.description,
      CONFIG.commands.codegen.cmd,
      CONFIG.commands.codegen.args
    );

  const result = await orchestrator.execute();

  if (!result.success) {
    process.exit(1);
  }
};

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    Logger.error(`Fatal error: ${error.message}`);
    process.exit(1);
  });
}
