import {expect} from "@playwright/test";

/**
 * Asserts that the actual value is within an acceptable drift percentage of the expected value when comparing
 * values rounded in the UI to those calculated by the browser with greater precision.
 * This function calculates the drift between the expected and actual values, determines the allowable drift
 * based on the percentage tolerance, and verifies that the actual drift does not exceed the allowable drift.
 * It logs detailed information about the expected, actual, allowable drift, and actual drift percentages.
 *
 * @param {number} expected - The expected value.
 * @param {number} actual - The actual value to compare against the expected value.
 * @param {number} percentageTolerance - The allowable percentage tolerance for drift (e.g., 0.05 for 5%).
 * @returns {void} This function does not return a value but throws an assertion error if the drift exceeds the tolerance.
 */
export function expectWithinDrift(
    expected: number,
    actual: number,
    percentageTolerance: number
): void {
    const drift = Math.abs(expected - actual);
    const allowedDrift = expected * percentageTolerance;
    const actualPercentageDrift = (drift / expected) * 100;

    console.log(`Expected: ${expected.toFixed(2)}, Actual: ${actual.toFixed(2)}`);
    console.log(`Allowable drift: ${allowedDrift.toFixed(2)} (${(percentageTolerance * 100).toFixed(2)}%)`);
    console.log(`Actual drift: ${drift.toFixed(2)} (${actualPercentageDrift.toFixed(4)}%)`);

    expect(drift).toBeLessThanOrEqual(allowedDrift);
}


