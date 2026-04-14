
export function limitString(inputStr: string, maxLength: number): string {
  return inputStr.length > maxLength ? inputStr.substring(0, maxLength) + '...' : inputStr;
}

export function reportDebugLog(message: string, messageType: string = 'debug'): void {
  if (process.env.DEBUG_LOG) {
    console.log(`${formatDateToYmdHms(new Date())} [${limitString(messageType.toUpperCase(), 10)}]: ${message}`);
  }
}

export function padTo2Digits(num: number): string {
  return num.toString().padStart(2, '0');
}

export function formatDateToYmd(date: Date): string {
  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-');
}

export function formatDateToHms(date: Date): string {
  return [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':');
}

export function formatDateToYmdHms(date: Date): string {
  return `${formatDateToYmd(date)} ${formatDateToHms(date)}`;
}

