import {v4 as uuidv4} from 'uuid';

/**
 * Generates a random email address for automated testing purposes that will not bounce.
 * @returns A random, unique email address.
 */
export function generateRandomEmail(): string {
  // Get current timestamp
  const timestamp = Date.now();

  // Generate a random number
  const randomNumber = Math.floor(Math.random() * 1_000);

  // Combine elements into a random email
  return `mpt.qlt+execution-${timestamp}${randomNumber}@gmail.com`;
}

export function generateRandomOrganizationName(): string {
  return `Test Organization ${uuidv4()}`;
}
