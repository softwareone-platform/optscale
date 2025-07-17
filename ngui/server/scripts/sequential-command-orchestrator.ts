import { spawn, SpawnOptions } from "child_process";
import { Logger } from "../utils/logger.js";
import { formatDuration, createTimeTracker } from "../utils/time.js";

type CommandOptions = {
  name?: string;
  timeout?: number;
  spawnOptions?: SpawnOptions;
};

type CommandResult = {
  code: number;
  signal?: string;
};

type ExecutionResult = {
  success: boolean;
  duration: number;
  name: string;
  error?: Error;
};

type OrchestratorResult = {
  success: boolean;
  totalTime: number;
  results: ExecutionResult[];
  error?: Error;
};

type OrchestratorConfig = {
  processName?: string;
};

type StepConfig = {
  name: string;
  command: string;
  args: string[];
  options?: CommandOptions;
};

const executeCommand = async (
  command: string,
  args: string[] = [],
  options: CommandOptions = {}
): Promise<CommandResult> => {
  const {
    name = "Command",
    timeout = 300000, // 5 min default timeout
  } = options;

  return new Promise<CommandResult>((resolve, reject) => {
    const child = spawn(command, [...args], {
      stdio: "inherit",
      shell: true,
      ...options.spawnOptions,
    });

    const timeoutId = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error(`${name} timed out after ${timeout}ms`));
    }, timeout);

    // Handle successful completion
    child.on("close", (code, signal) => {
      clearTimeout(timeoutId);
      if (code === 0) {
        resolve({ code, signal: signal ?? undefined });
      } else {
        const errorMsg = signal
          ? `${name} was terminated by signal ${signal}`
          : `${name} failed with exit code ${code}`;
        reject(new Error(errorMsg));
      }
    });

    // Handle process errors
    child.on("error", (error: Error) => {
      clearTimeout(timeoutId);
      reject(new Error(`${name} process error: ${error.message}`));
    });

    // Handle process termination signals
    const cleanup = (): void => {
      console.log("cleanup");
      if (!child.killed) {
        child.kill("SIGTERM");
      }
    };

    process.once("SIGINT", cleanup);
    process.once("SIGTERM", cleanup);
  });
};

const executeStep = async (config: StepConfig): Promise<ExecutionResult> => {
  const { name, command, args, options = {} } = config;

  Logger.info(`Starting ${name}...`);
  const timer = createTimeTracker();

  try {
    await executeCommand(command, args, {
      name,
      ...options,
    });

    const duration = timer.stop();
    Logger.success(`${name} completed in ${formatDuration(duration)}`);

    return { success: true, duration, name };
  } catch (error) {
    const duration = timer.stop();
    const errorInstance =
      error instanceof Error ? error : new Error(String(error));

    Logger.error(
      `${name} failed after ${formatDuration(duration)}: ${
        errorInstance.message
      }`
    );

    return { success: false, duration, error: errorInstance, name };
  }
};

export class SequentialCommandOrchestrator {
  private readonly processName: string;
  private readonly steps: StepConfig[] = [];
  private readonly results: ExecutionResult[] = [];

  constructor(config: OrchestratorConfig = {}) {
    this.processName = config.processName ?? "Process";
  }

  addStep(
    name: string,
    command: string,
    args: string[],
    options: CommandOptions = {}
  ): this {
    this.steps.push({ name, command, args, options });
    return this;
  }

  async execute(): Promise<OrchestratorResult> {
    Logger.info(`Starting ${this.processName.toLowerCase()}...`);
    const totalTimer = createTimeTracker();

    try {
      for (const stepConfig of this.steps) {
        const result = await executeStep(stepConfig);
        this.results.push(result);

        if (!result.success) {
          throw result.error;
        }
      }

      const totalTime = totalTimer.stop();
      this.logSuccess(totalTime);

      return { success: true, totalTime, results: [...this.results] };
    } catch (error) {
      const totalTime = totalTimer.stop();
      const errorInstance =
        error instanceof Error ? error : new Error(String(error));
      this.logFailure(totalTime, errorInstance);

      return {
        success: false,
        totalTime,
        error: errorInstance,
        results: [...this.results],
      };
    }
  }

  private logSuccess(totalTime: number): void {
    Logger.success(
      `${this.processName} completed successfully in ${formatDuration(
        totalTime
      )}`
    );
    this.logBreakdown();
  }

  private logFailure(totalTime: number, error: Error): void {
    Logger.error(
      `${this.processName} failed after ${formatDuration(totalTime)}`
    );
    Logger.error(`Error: ${error.message}`);
  }

  private logBreakdown(): void {
    Logger.info(`${this.processName} breakdown:`);
    this.results.forEach(({ name, duration }) => {
      Logger.info(`   └─ ${name}: ${formatDuration(duration)}`);
    });
  }
}
