import { debugLog } from './debug-logging';

/**
 * Determines if the actual value is within an acceptable rounding drift of the expected value.
 *
 * This function calculates the absolute difference (drift) between the expected and actual values,
 * and checks if it is within a specified percentage tolerance. It logs the expected and actual values,
 * the allowable drift, and the actual drift for debugging purposes.
 *
 * @param {number} expected - The expected value to compare against.
 * @param {number} actual - The actual value to be checked.
 * @param {number} percentageTolerance - The allowable percentage tolerance for the drift (e.g., 0.05 for 5%).
 * @returns {boolean} - Returns `true` if the actual value is within the allowable drift, otherwise `false`.
 */
export function isWithinRoundingDrift(expected: number, actual: number, percentageTolerance: number): boolean {
  const drift = Math.abs(expected - actual); // Calculate the absolute difference between expected and actual values.
  const allowedDrift = expected * percentageTolerance; // Calculate the maximum allowable drift based on the tolerance.
  const actualPercentageDrift = (drift / expected) * 100; // Calculate the actual drift as a percentage of the expected value.

  // Log the expected and actual values, allowable drift, and actual drift for debugging.
  debugLog(`Expected: ${expected.toFixed(2)}, Actual: ${actual.toFixed(2)}`);
  debugLog(`Allowable drift: ${allowedDrift.toFixed(2)} (${(percentageTolerance * 100).toFixed(2)}%)`);
  debugLog(`Actual drift: ${drift.toFixed(2)} (${actualPercentageDrift.toFixed(4)}%)`);

  // Return true if the actual drift is within the allowable drift, otherwise false.
  const result = drift <= allowedDrift;
  debugLog('Returning: ' + result);
  return result;
}
