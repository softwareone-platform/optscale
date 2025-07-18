type LogLevel = "success" | "error" | "warn" | "info" | "debug";
type LogColor = "green" | "yellow" | "red" | "reset" | "dim" | "blue";
type LogMessage = string;

const colors = {
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  blue: "\x1b[34m",
} as const;

export class Logger {
  static formatMessage(
    level: LogLevel,
    message: LogMessage,
    color: LogColor = "reset"
  ) {
    const timestamp = new Date().toLocaleTimeString("en-GB", { hour12: false }); // HH:MM:SS
    const colorCode = colors[color];
    const resetCode = colors.reset;
    return `${colorCode}[${timestamp}] [${level.toUpperCase()}] ${message}${resetCode}`;
  }

  static error(message: LogMessage) {
    console.log(this.formatMessage("error", message, "red"));
  }

  static warn(message: LogMessage) {
    console.log(this.formatMessage("warn", message, "yellow"));
  }

  static info(message: LogMessage) {
    console.log(this.formatMessage("info", message, "blue"));
  }

  static success(message: LogMessage) {
    console.log(this.formatMessage("success", message, "green"));
  }

  static debug(message: LogMessage) {
    console.log(this.formatMessage("debug", message, "dim"));
  }
}
