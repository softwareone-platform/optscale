import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a random email address for automated testing purposes.
 * @param domain Optional domain name to use; defaults to "example.com".
 * @returns A random, unique email address.
 */
export function generateRandomEmail(domain: string = 'example.com'): string {
    // Get current timestamp
    const timestamp = Date.now();

    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 1_000);

    // Combine elements into a random email
    return `test_${timestamp}_${randomNumber}@${domain}`;
}